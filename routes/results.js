const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  //results/:id
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM quiz_results JOIN users ON users.id = user_id JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_results.id = $1`, [req.params.id]).then(result => {
      res.render("result", result.rows[0])
    }).catch(err => {
      res.status(500).json({error: err.message});
    }); // renders the quiz results after a user has finished a quiz
  });
  return router;
};
