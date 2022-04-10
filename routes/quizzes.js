/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
};

module.exports = (db) => {
  //quizzes/:id
  router.get("/:id", (req, res) => {

  });

  //quizzes/u/:id
  router.get("/u/:id", (req, res) => {
    
  });

  //quizzes/add
  router.get("/add", (req, res) => {
    //quizzes/add
    res.redirect("/add_questions"); //redirects user to page where user creates the quiz (not questions)
  });

  router.post("/add", (req, res) => {
     //redirects user to page where user adds questions with the quiz with the quizID AFTER USER CLICKS CREATE A Qd to make the page that directs the user to the create a quUIZ
      //neeiz page
  });

  return router;
};

