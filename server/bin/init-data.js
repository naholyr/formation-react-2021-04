const validWords = require("./all-words");
const guessableWords = require("./common-words-5-10");
const {
  initValidWords,
  initGuessableWords,
  client,
} = require("../lib/game-engine");

const main = async () => {
  console.log("Injecting valid words...");
  try {
    await initValidWords(validWords);
    console.log("Valid words: done.");
  } catch (err) {
    console.error("Valid words: error (" + err.message + ")");
  }

  console.log("Injecting guessable words...");
  try {
    await initGuessableWords(guessableWords);
    console.log("Guessable words: done.");
  } catch (err) {
    console.error("Guessable words: error (" + err.message + ")");
  }

  client.end();
};

main();
