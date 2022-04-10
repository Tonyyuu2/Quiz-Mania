/*
 * All routes for questions are defined here
 * Since this file is loaded in server.js into api/questions,
 *   these routes are mounted onto /questions
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //questions/add
  router.get("/add", (req, res) => {
    res.render("add_questions"); //redirects user to page where user can add questions to the quiz
  });

  router.post("/add", (req, res) => {
    db.query(`INSERT INTO questions (quiz_id, question_desc) VALUES ($1, $2) RETURNING *`, [req.body.quiz_id, req.body.question_desc]).then(result => {

      db.query(`INSERT INTO question_options (quiz_id, question_id, option_1, option_2, option_3, option_4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`[req.body.quiz_id, req.body.question_id, req.body.option_1, req.body.option_2, req.body.option_3, req.body.option_4, req.body.answer]).then(result => {

        res.render("add_questions", res.rows); //redirects user back to the same page after adding the questions on to the database while referencing the quiz_id ADDS QUESTION
      });
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  router.post("/add-all", (req, res) => {
    db.query(`INSERT INTO questions (quiz_id, question_desc) VALUES ($1, $2) RETURNING *`, [req.body.quiz_id, req.body.question_desc]).then(result => {

      db.query(`INSERT INTO question_options (quiz_id, question_id, option_1, option_2, option_3, option_4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`[req.body.quiz_id, req.body.question_id, req.body.option_1, req.body.option_2, req.body.option_3, req.body.option_4, req.body.answer]).then(result => {

        res.redirect("view_quiz", res.rows); //adds one or more questions then redirects, FINISHES CREATING QUIZ //consolidation page
      });
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });
  });
  return router;
};
