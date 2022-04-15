const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

const { getUserQuizResult } = require("../db/database_helper_functions");

module.exports = (db) => {

  router.get("/:result_url", (req, res) => {
    getUserQuizResult(db, req.params.result_url).then(result => {
      const { url, user_score, total_score, name, title } = result;
      res.render("2_4_share_my_result",{ url, user_score, total_score, name, title });
    });
  });
  return router;
};
