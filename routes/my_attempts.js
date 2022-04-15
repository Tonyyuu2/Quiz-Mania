const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { getMyAttempts } = require("../db/database_helper_functions");

module.exports = (db) => {

  router.get("/", (req, res) => {
    getMyAttempts(db, 1).then(result => {
      res.render("my_attempts", { results: result });
    }).catch(err => {
      console.log(err);
      res.status(500).send("failed");
    });
  });
  return router;
};
