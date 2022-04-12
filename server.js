// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const quizzesRoutes = require("./routes/quizzes");
const questionsRoutes = require("./routes/questions");
const resultsRoutes = require("./routes/results");
const myAttempts = require("./routes/my_attempts");
const quizTest = require("./routes/quiztest");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/quizzes", quizzesRoutes(db));
app.use("/questions", questionsRoutes(db));
app.use("/results", resultsRoutes(db));
app.use("/my_attempts", myAttempts(db));
app.use("/quiztest", quizTest(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  db.query(`SELECT * FROM quizzes`).then(result => {
    console.log({ quizzes: result.rows });
    //const templateVars = result.rows[0];
    res.render("1_1_home", { quizzes: result.rows });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
