/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const { getAllQuizzes, getQuizFromUserURL, addQuiz} = require("../db/database_helper_functions");

const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
};

module.exports = (db) => {
  //quizzes/:id
  router.get("/:id", (req, res) => {

    })


  //quizzes/u/:id
  router.get("/u/:id", (req, res) => {

  });

  //quizzes/add
  router.get("/add", (req, res) => {
    //quizzes/add
    res.redirect("/add_questions"); //redirects user to page where user creates the quiz (not questions)
  });

  router.post("/add", (req, res) => {
    const result = addQuiz(db);
    res.redirect("/question/add", result) //redirect happens here
  });

  return router;
};

