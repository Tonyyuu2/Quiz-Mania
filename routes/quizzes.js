/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { addRandomQuestions, addRandomQuiz, getQuizFromUserURL, addQuiz, addQuestion, getQuizRandomURL } = require("../db/database_helper_functions");

module.exports = (db) => {
  //quizzes/add
  router.get("/add", (req, res) => {
    res.render("1_2_create_quiz"); //redirects user to page where user creates the quiz (not questions) // change render page
  });

  router.post("/add", (req, res) => {
    addQuiz(db, req.body).then(result => {
      res.redirect(`/questions/${result}/add`); //redirect happens here
    })
      .catch(err => {
        console.log(err);
      });
  });

  router.post("/random", (req, res) => {
    const apiData = req.body.data.results;
    console.log("--------------------", apiData);
    addRandomQuiz(db, apiData[0].category).then(quizId => {
      addRandomQuestions(db, quizId, apiData).then(data => {
        res.sendStatus(200);
      });

    });
  });
  //quizzes/u/:id
  router.get("/u/:id", (req, res) => {
    getQuizFromUserURL(db, req.params.id).then(result => {
      const { title, description, quizid, questionid } = result;
      res.render("2_1_start_quiz", { title, description, quizid, questionid });
    }).catch(err => {
      console.log(err);
    });
  });


  router.post("/:id/view", (req, res) => {
    const quizId = req.params.id;
    addQuestion(db, req.body, quizId).then(result => {
      getQuizRandomURL(db, result).then(data => {
        res.render(`1_4_user_generated_quiz`, { url: data });
      });
    }).catch(err => {
      console.log(err);
    });
  });
  return router;
};

