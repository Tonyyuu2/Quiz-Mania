
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


app.use("/quizzes", quizzesRoutes(db));
app.use("/questions", questionsRoutes(db));
app.use("/results", resultsRoutes(db));
app.use("/my_attempts", myAttempts(db));
app.use("/quiz-attempts", quizAttempts(db));


app.get("/", (req, res) => {
  db.query(`SELECT * FROM quizzes ORDER BY id DESC`).then(result => {
    res.render("1_1_home", { quizzes: result.rows });
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
