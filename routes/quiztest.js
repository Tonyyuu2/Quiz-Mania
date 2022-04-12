const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { addTestResult, getQuizData } = require("../db/database_helper_functions");


module.exports = (db) => {
  // /taking_tests
  router.get("/:id", (req, res) => {
    const quizID = req.params.id;
    getQuizData(db, quizID).then(result => {
      /* localStorage.setItem("questions", result); */
      res.render("2_2_display_question", result); //takes user to form to answer quiz questions
    });
  });

  router.post("/"), (req, res) => {
    addTestResult(db).then(result => {
      res.redirect("/result");
    }).catch(err => {
      res.status(500).send("failed");
    });
  }; // records the user's results and redirects them to a congratulations page
  return router;
};

