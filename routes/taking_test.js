const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // /taking_tests
  router.get("/", (req, res) => {
    res.render(""); //takes user to form to answer quiz questions
  });

  router.post("/"), (req, res) => {

  }; // records the user's results and redirects them to a congratulations page
  return router;
};
