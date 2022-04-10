/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

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
    const { quiz_title, quiz_description, is_public } = req.body;
    const quizID = generateRandomString();
    console.log(quizID);
    db.query(`INSERT INTO quizzes (user_id, public, description, url) VALUES ($1, $2, $3, $4) RETURNING *`, [1, is_public, quiz_description, quizID]).then(result => {
      //neeiz page
    }).catch(err => {
      res.status(500).json({ error: err.message });
    });
    res.redirect("/questions/add"); //redirects user to page where user adds questions with the quiz with the quizID AFTER USER CLICKS CREATE A Qd to make the page that directs the user to the create a quUIZ
  });

  return router;
};

