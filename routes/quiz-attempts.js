const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { addTestResult, getQuizResult, getQuizData, checkAnswer, getNextQuestion, insertUserAttempt } = require("../db/database_helper_functions");

module.exports = (db) => {

  router.get("/:id/result", (req, res) => {
    getQuizResult(db, req.params.id).then((result) => {
      const { user_score, total_score, result_url, title } = result;
      res.render("2_3_result", { user_score, total_score, result_url, title });
    });
  });

  router.get("/ajax/:id", (req, res) => {
    const quizID = req.params.id;
    getQuizData(db, quizID).then(result => {
      /* localStorage.setItem("questions", result); */
      res.send(result); //takes user to form to answer quiz questions
    });
  });

  router.post("/my-attempts", (req, res) => {
    insertUserAttempt(db, req.body.qid, req.body.queid, req.body.isTrue)
      .then(result => { })
      .catch(err => console.log(err));
  });

  router.get("/", (req, res) => {
    getNextQuestion(db, req.query.qid, req.query.que)
      .then(result => {
        const { option_1, option_2, option_3, option_4 } = result;
        const options = [option_1, option_2, option_3, option_4];
        options.sort();
        res.render("2_2_display_question", { result, options });
      }).catch(err => {
        console.log(err);
      });
  });

  router.get("/:quizId/questions/:queID/check", (req, res) => {
    checkAnswer(db, req.query.option, req.params.quizId, req.params.queID)
      .then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err);
      });
  });

  router.get("/:id", (req, res) => {
    const quizID = req.params.id;
    getQuizData(db, quizID).then(result => {
      res.render("2_2_display_question", result[0]);
    });
  });

  router.post("/"), (req, res) => {
    addTestResult(db).then(result => {
      res.redirect("/result");
    }).catch(err => {
      console.log(err);
    });
  };
  return router;
};
