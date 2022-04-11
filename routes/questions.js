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
    res.render("add_questions"); //redirects user to page where user can add questions to the quiz
  });

  router.post("/add", (req, res) => {
    //redirects user back to the same page after adding the questions on to the database while referencing the quiz_id ADDS QUESTION
    addQuestion(db, req.body).then(result => {
      res.redirect(" ")
    }).catch(err => {
      res.status(500).send("failed")
    })
  });


  router.post("/add-all", (req, res) => { //need to change semantics
  //adds one or more questions then redirects, FINISHES CREATING QUIZ //consolidation page
    addQuestion(db, req.body).then(result => {
      res.redirect(" ") //add redirect
    }).catch(err => {
      res.status(500).send("failed")
    })
  });
  return router;
};
