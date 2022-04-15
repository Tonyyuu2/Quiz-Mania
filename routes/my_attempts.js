const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { getMyAttempts } = require("../db/database_helper_functions");

module.exports = (db) => {
  // /my_attempts/ (the id)
  // renders all the attempts and results of a user
  router.get("/", (req, res) => {
    getMyAttempts(db, 1).then(result => {
      console.log(result);
      res.render("my_attempts", { results: result });
    }).catch(err => {
      console.log(err);
      res.status(500).send("failed");
    });
  });
  return router;
};
