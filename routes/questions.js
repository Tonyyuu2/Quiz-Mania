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

  router.get("/:id/add", (req, res) => {
    res.render("1_3_add_question", { id: req.params.id });
  });

  router.post("/:id/add", (req, res) => {
    const quizId = req.params.id;
    addQuestion(db, req.body, quizId).then(result => {
      res.redirect(`/questions/${result}/add`)
    }).catch(err => {
      console.log(err);
      res.status(500).send("failed");
    });
  });

  router.post("/add-all", (req, res) => {
    addQuestion(db, req.body).then(result => {
      res.redirect(" "); //add redirect
    }).catch(err => {
      res.status(500).send("failed");
    });
  });
  return router;
};
