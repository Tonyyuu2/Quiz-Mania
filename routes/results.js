const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { getAllResults } = require("../db/database_helper_functions");

module.exports = (db) => {
  //results/:id
   // renders the quiz results after a user has finished a quiz
  router.get("/:id", (req, res) => {
    getAllResults(db, req.params).then(result => {
      res.render("result") //add render route
    }).catch(err => {
      res.status(500).send("failed")
    })
  })

  return router;
};
