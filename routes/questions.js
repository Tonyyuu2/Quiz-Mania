/*
 * All routes for questions are defined here
 * Since this file is loaded in server.js into api/questions,
 *   these routes are mounted onto /questions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //questions/add
  router.get("/add", (req, res) => {
    res.render("add_questions"); //redirects user to page where user can add questions to the quiz
  });

  router.post("/add", (req, res) => {
    //redirects user back to the same page after adding the questions on to the database while referencing the quiz_id ADDS QUESTION
  });

  router.post("/add-all", (req, res) => {
  //adds one or more questions then redirects, FINISHES CREATING QUIZ //consolidation page
  });
  return router;
};
