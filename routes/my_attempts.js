const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // /
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM quiz_results JOIN quizzes ON quizzes.id = quiz_id JOIN users ON users.id = quiz_results.user_id WHERE users.id = $1`, [req.session.user_id]).then(result => {
      res.render("my_attempts", result.rows) //
    }).catch(err => {
      res.status(500).json({error: err.message});
    });
  }); // renders all the attempts and results of a user
  return router;
};
