const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { addTestResult, getQuizData, checkAnswer } = require("../db/database_helper_functions");


module.exports = (db) => {
  // /taking_tests
  router.get("/:id", (req, res) => {
    const quizID = req.params.id;
    getQuizData(db, quizID).then(result => {
      /* localStorage.setItem("questions", result); */
      res.render("2_2_display_question", result[0]); //takes user to form to answer quiz questions
    });
  });

  router.get("/ajax/:id", (req, res) => {
    const quizID = req.params.id;
    getQuizData(db, quizID).then(result => {
      /* localStorage.setItem("questions", result); */
      res.send(result); //takes user to form to answer quiz questions
    });
  });



  router.post("/:quizId/questions/:queID", (req, res) => {

    //console.log(req.body);

  });

  router.get("/:quizId/questions/:queID", (req, res) => {
    //console.log(JSON.stringify(req.body));
    console.log("---------------------------------", req.query.option);
    //console.log("---------------------------------", req.body.option, req.params.quizId, req.params.queID);
    checkAnswer(db, req.query.option, req.params.quizId, req.params.queID)
      .then(result => {
        console.log(result);
        res.send(result);
      }).catch(err => {
        console.log(err);
      });
  });

  router.post("/"), (req, res) => {
    addTestResult(db).then(result => {
      res.redirect("/result");
    }).catch(err => {
      console.log(err);
    });
  }; // records the user's results and redirects them to a congratulations page
  return router;
};

