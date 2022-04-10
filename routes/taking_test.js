const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // /taking_tests
  router.get("/", (req, res) => {
    res.render(""); //takes user to form to answer quiz questions
  });

  router.post("/"), (req, res) => {
    const user = req.session.user_id;

    db.query(`INSERT INTO quiz_results (user_id, quiz_id, user_score, total_score, date, result_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [req.body.user_id, req.body.quiz_id, req.body.user_score, req.body.total_score, req.body.date, req.body.result_url]).then(result => {
      res.redirect("/result", res.rows[0].user_id)
    }).catch(err => {
      res.status(500).json({error: err.message});
    });
  }; // records the user's results and redirects them to a congratulations page
  return router;
};
