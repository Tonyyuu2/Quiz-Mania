/*
 * All routes for questions are defined here
 * Since this file is loaded in server.js into api/questions,
 *   these routes are mounted onto /questions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { addQuestion } = require("../db/database_helper_functions");

module.exports = (db) => {
  //questions/add
  router.get("/add", (req, res) => {
    res.render("1_3_add_questions", {ide: ""}); //renderse the page where user can add questions to the quiz
  });

  router.post("/add", (req, res) => {
  console.log('anything---------', req.body);
    addQuestion(db, req.body).then(result => {
      // const {quiz_id} = result
      console.log('resultsdafafnasndfnasf :', result);
      res.render("1_3_add_question")
    }).catch(err => {
      res.status(500).send("failed")
    })//redirects user back to the same page after adding the questions on to the database while referencing the quiz_id ADDS QUESTION
  });


  router.post("/add-all", (req, res) => { //need to change semantics
    addQuestion(db, req.body).then(result => {
      res.redirect("/user_generated_quiz") //// redirects user to s page where the user can take the quiz or share it
    }).catch(err => {
      res.status(500).send("failed")
    })
  });
  return router;
};
