
require("dotenv").config();


const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");


const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


// loading packages
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
    isSass: false,
  })
);

app.use(express.static("public"));

const quizzesRoutes = require("./routes/quizzes");
const questionsRoutes = require("./routes/questions");
const resultsRoutes = require("./routes/results");
const myAttempts = require("./routes/my_attempts");
const quizAttempts = require("./routes/quiz-attempts");
const { threeColumnQuizzes } = require("./db/database_helper_functions");


// Mount all resource routes
app.use("/quizzes", quizzesRoutes(db));
app.use("/questions", questionsRoutes(db));
app.use("/results", resultsRoutes(db));
app.use("/my_attempts", myAttempts(db));
app.use("/quiz-attempts", quizAttempts(db));


// Home page
app.get("/", (req, res) => {
  threeColumnQuizzes(db).then(result => {
    res.render("1_1_home", result)
  })
  .catch(err => {
    console.log(err)
  })
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
