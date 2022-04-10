/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
};

module.exports = (db) => {
  //quizzes/:id
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM quizzes WHERE quizzes.id = $1;`, [req.params.id]).then(result => {
      res.render("quizzes/:id", result.rows[0]); //render the appropriate quiz given the quiz id
    })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  });

  //quizzes/u/:id
  router.get("/u/:id", (req, res) => {
    db.query(`SELECT * FROM quizzes WHERE quizzes.url LIKE $1`, ['%' + req.params.id]).then(result => {
      res.render("quizzes/u/:id", result.rows[0]);
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  //quizzes/add
  router.get("/add", (req, res) => {
    //quizzes/add
    res.redirect("/add_questions"); //redirects user to page where user creates the quiz (not questions)
  });

  router.post("/add", (req, res) => {
    const quizID = generateRandomString();
    db.query(`INSERT INTO quizzes (user_id, public, description, url) VALUES ($1, $2, $3, $4) RETURNING *`, [req.body.user_id, req.body.public, req.body.description, quizID]).then(result => {
      res.redirect("/need_to_make", result.rows[0].quizID); //redirects user to page where user adds questions with the quiz with the quizID AFTER USER CLICKS CREATE A Qd to make the page that directs the user to the create a quUIZ
      //neeiz page
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });
  });

  return router;
};

