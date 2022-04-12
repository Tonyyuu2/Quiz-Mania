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

const { getQuiz, getQuizFromUserURL, addQuiz} = require("../db/database_helper_functions");
const results = require('./results');

module.exports = (db) => {
  //quizzes/create -> get
  router.get("/create", (req, res) => {
    res.render("1_2_create_quiz"); //redirects user to page where user creates the quiz (not questions) // change render page
  });

  //quizzes/:id
  router.get("/:id", (req, res) => {
    getQuiz(db, req.params).then(result => {
      res.render("start_quiz"); //renders the rule page with the particular quiz URL
    }).catch(err => {
      res.status(500).send("failed")
    })
  });

  //quizzes/u/:id
  router.get("/u/:id", (req, res) => {
    getQuizFromUserURL(db, req.params).then(result => {
      res.render("start_quiz"); //renders the rule page with the particular quiz URL given a USER
    }).catch(err => {
      res.status(500).send("failed")
    })
  });

  //quizzes/add -> post
  router.post("/add", (req, res) => {
    addQuiz(db, req.body).then(result => {
      console.log('----result---', result);
      const {id} = result
      console.log('id :', id);
      res.render("1_3_add_question", {ide: id}) //
    })
    .catch(err => {
      res.status(500).send("failed")
    })
  });

  return router;
};

