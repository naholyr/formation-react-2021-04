/* globals $:readonly, _:readonly, io:readonly */

const socket = io.connect();

const loginWS = (token) => {
  socket.emit("login", token, (game) => {
    if (!game) {
      alert("L’authentification au serveur temps réel super rapide a échoué");
      return;
    }
    updateUI(game); // { wordLength, scores, trials }
  });
  socket.once("reconnect", () => {
    loginWS(token);
  });
};

// On submit login form
const logIn = async (username) => {
  try {
    const result = await $.post("/login", { username });
    localStorage.setItem("token", result.token);
    loginWS(result.token);
  } catch (err) {
    alert("Login invalide");
    throw new Error("LoginFailed");
  }
};

// Auto-login on load
const token = localStorage.getItem("token");
if (token) {
  $.get("/whoami?token=" + encodeURIComponent(token))
    .then(({ username }) => {
      updateUI({ username, form: false });
      loginWS(token);
    })
    .catch((err) => {
      localStorage.removeItem("token");
      console.error("Invalid Token", err.message);
      updateUI({ username: null, form: true });
    });
} else {
  $(() => {
    updateUI({ form: true });
  });
}

const sendWord = (word) => {
  disableInput();
  socket.emit("tryWord", word);
};

socket.on("addTrial", (trial) => {
  addTrial(trial);
});

socket.on("enableInput", () => {
  enableInput();
});

socket.on("disableInput", () => {
  disableInput();
});

socket.on("failure", (message) => {
  alert(message);
});

socket.on("updateScores", (scores) => {
  updateScores(scores);
});

socket.on("wordLength", (wordLength) => {
  updateUI({ wordLength, trials: [] });
});

socket.on("winner", (username) => {
  console.log("Winner", username);
});

/**
 * INTERNAL IMPLEMENTATION
 */

let state = {
  /*
  form: boolean?
  username: string?
  wordLength: number
  trials: [
    {
      name: string
      word: [ [ letter: char, status: 0|1|2 ] ]
    }
  ]
  scores: [
    {
      name: string
      score: number
    }
  ]
  */
};

// UI update

const tplScore = _.template($("#tpl-score").text());
const tplTrial = _.template($("#tpl-trial").text());
const LETTER_STATUS_CLASS = ["incorrect", "misplaced", "correct"];
const updateUI = ({ username, trials, scores, wordLength, form }) => {
  const updates = {};
  // Login form
  if (form !== undefined && state.form !== form) {
    updates.form = form;
    $("#login").toggle(!!form);
  }
  // Authentication status
  if (username !== undefined && state.username !== username) {
    updates.username = username;
    $("#login").toggle(!username);
    $("#game").toggle(!!username);
    $(username ? "#game input" : "#login input").focus();
  }
  // Word input
  if (wordLength !== undefined && state.wordLength !== wordLength) {
    updates.wordLength = wordLength;
    $('#word [name="word"]')
      .attr("minlength", wordLength)
      .attr("maxlength", wordLength)
      .css("width", 2 * wordLength + "rem")
      .attr("placeholder", wordLength + " lettres");
  }
  // Game status
  if (trials !== undefined && state.trials !== trials) {
    updates.trials = trials;
    const html = _.map(trials, ({ name, word }) =>
      tplTrial({
        userName: name,
        isMyself: name === state.username,
        letters: word.map(([letter, intStatus]) => ({
          letter,
          status: LETTER_STATUS_CLASS[intStatus],
        })),
      })
    ).join("");
    $("#trials").html(html);
  }
  // Scores
  if (scores !== undefined && state.scores !== scores) {
    updates.scores = scores;
    const html = _.map(scores, ({ name, score }) =>
      tplScore({
        userName: name,
        isMyself: name === state.username,
        score,
      })
    ).join("");
    $("#scores").html(html);
  }
  // Update internal state for next update
  state = { ...state, ...updates };
};

// login

$("#login").on("submit", async (e) => {
  e.preventDefault();
  const username = e.currentTarget.elements.username.value;
  $("#login button, #login input").attr("disabled", true);
  try {
    await logIn(username);
    updateUI({ username });
  } catch (err) {
    $("#login button, #login input").removeAttr("disabled");
  }
});

// add trial

$("#word").on("submit", (e) => {
  e.preventDefault();
  sendWord(e.currentTarget.elements.word.value);
});

const addTrial = (trial) => {
  updateUI({ trials: [...state.trials, trial] });
};

// Disable input temporarily

const disableInput = () => {
  $('#word [name="word"]').attr("disabled", true).val("");
};

const enableInput = () => {
  $('#word [name="word"]').removeAttr("disabled").focus();
};

// New user joined

const updateScores = (scores) => {
  updateUI({ scores });
};
