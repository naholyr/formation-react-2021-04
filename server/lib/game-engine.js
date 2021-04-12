"use strict";

const Redis = require("ioredis");
const _ = require("lodash");
const config = require("config");

const client = new Redis({
  host: config.redis.host,
  port: config.redis.port,
  db: config.redis.db,
});

exports.client = client; // expose client for tests and closing connection

const formatWord = (word) => _.deburr(word).toUpperCase();

const initWordsSet = async (words, key) => {
  await client.pipeline().del(key).sadd(key, words.map(formatWord)).exec();
};

exports.initValidWords = async (words) => {
  await initWordsSet(words, "valid_words");
};

exports.initGuessableWords = async (words) => {
  await initWordsSet(words, "guessable_words");
};

exports.isValidWord = async (word) => {
  return client.sismember("valid_words", formatWord(word));
};

exports.pickNewWord = async () => {
  // TODO Redis's Watch-Multi-Exec optimistic lock
  // Grab random word
  let word = await client.srandmember("guessable_words");

  if (!word) {
    // No more words available: restore guessed words and start over
    const result = await client
      .pipeline() // MULTI?
      .sunionstore("guessable_words", "guessable_words", "guessed_words")
      .del("guessed_words")
      .srandmember("guessable_words")
      .exec();
    word = result[result.length - 1][1];
  }

  if (!word) {
    // Still no word available: that's fatal
    throw new Error("NO_GUESSABLE_WORD");
  }

  await client
    .pipeline() // MULTI?
    .srem("guessable_words", word) // Don't guess this one again later
    .sadd("guessed_words", word) // Add to other list
    .set("current_word", word) // Store as current word
    .del("trials") // Clear trials
    .exec();

  return word.length;
};

/**
 * Output: Array<{ name: string, score: number }>
 */
exports.getScores = async () => {
  const scores = await client.hgetall("scores"); // Object<[username: string]: (points: number)>
  // { toto: "6", tata: "30" }
  // => [ { name: ..., score: ... }, ... ]
  // => sort
  /*
  _.chain(scores)
    .map((v, k) => {
      return { name: k, score: Number(v) };
    })
    .orderBy(["score", "name"], ["desc", "asc"])
    .value();
  */
  const scoresArray = _.map(scores, (v, k) => {
    return { name: k, score: Number(v) };
  });
  // FIXME: perf issues? Use .sort()?
  return _.orderBy(scoresArray, ["score", "name"], ["desc", "asc"]);
};

/**
 * Output: new score
 */
exports.addScore = async (username, points) => {
  return client.hincrby("scores", username, points);
};

/**
 * Input: string word
 * Output: Trial
 * Trial :: { name, word: Array<[ char, status: 0|1|2 ]> }
 */
exports.tryWord = async (username, word, checkValid = true) => {
  const currentWord = await client.get("current_word");

  word = formatWord(word);

  let win = word === currentWord;

  if (word.length !== currentWord.length) {
    throw new Error("INVALID_WORD_LENGTH");
  }

  if (checkValid) {
    const isValid = await exports.isValidWord(word);
    if (!isValid) {
      throw new Error("INVALID_WORD");
    }
  }

  const trial = word.split("").map((letter, index) => {
    if (currentWord[index] === letter) {
      return [letter, 2]; // OK
    } else if (currentWord.indexOf(letter) !== -1) {
      return [letter, 1]; // Misplaced
    } else {
      return [letter, 0]; // Wrong
    }
  });

  const result = {
    name: username,
    word: trial,
    win,
  };

  await client.rpush("trials", JSON.stringify(result));

  return result;
};

/**
 * Output: Array<Trial>
 * Trial :: Array<{ name, word: [ char, status: 0|1|2 ] }>
 */
exports.getTrials = async () => {
  const trials = await client.lrange("trials", 0, -1); // Array<string>
  return trials.map((v) => JSON.parse(v));
};

/**
 * Output: {
 *    trials: Array<Trial>
 *    scores: Array<{ name, score }>
 *    wordLength: number
 * }
 */
exports.getCurrentGame = async () => {
  const currentWordLength = await client.strlen("current_word");
  if (!currentWordLength) {
    const [scores, wordLength] = await Promise.all([
      exports.getScores(),
      exports.pickNewWord(),
    ]);
    return { trials: [], scores, wordLength };
  }
  const [trials, scores] = await Promise.all([
    exports.getTrials(), // trials
    exports.getScores(), // scores
  ]);
  return { trials, scores, wordLength: currentWordLength };
};
