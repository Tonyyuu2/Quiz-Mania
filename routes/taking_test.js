const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { addTestResult } = require("../db/database_helper_functions");


module.exports = (db) => {
  // /taking_tests
  router.get("/", (req, res) => {
    res.render(" "); //takes user to form to answer quiz questions
  });

  router.post("/"), (req, res) => {
    addTestResult(db).then(result => {
      res.redirect(" ");
    }).catch(err => {
      res.status(500).send("failed")
    })
  }; // records the user's results and redirects them to a congratulations page
  return router;
};

