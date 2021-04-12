// http://www.pallier.org/liste-de-mots-francais.html

const fs = require("fs");
const path = require("path");

module.exports = fs
  .readFileSync(
    path.join(__dirname, "liste.de.mots.francais.frgut.txt"),
    "utf8"
  )
  .trim()
  .split(/[\r\n]+/);
