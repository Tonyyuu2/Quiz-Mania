const req = require("express/lib/request");
const { Pool } = require("pg");

const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
}; //generate random string to use for quiz URL

const getQuiz = (db ,id) => { // function that renders the quiz given a URL

  return  db.query(`SELECT * FROM quizzes WHERE quizzes.id = $1;`, [id]).then(result => {
    return (result.rows[0])
    })
    .catch(err => {
      res.status(500).json({error: err.message });
    });
}
exports.getQuiz = getQuiz;

const getQuizFromUserURL = (db, url) => { // function that renders the quiz with a user URL

  return db.query(`SELECT * FROM quizzes WHERE quizzes.url LIKE $1`, ['%'+ url]).then(result => {
    return (result.rows[0])
  })
  .catch(err => {
    res.status(500).json({error: err.message });
  });
}
exports.getQuizFromUserURL = getQuizFromUserURL;

const addQuiz = (db, input) => { // function adds a quiz to the database (just the quiz, not the questions and answers)

  const { quiz_description, is_public } = input;
  const quizID = generateRandomString();

  return db.query(`INSERT INTO quizzes (user_id, public, description, url) VALUES ($1, $2, $3, $4) RETURNING *`, [1, is_public, quiz_description, quizID]).then(result => {
    return (result.rows[0])
  })
  .catch(err => {
    res.status(500).json({error: err.message});
  });
};
exports.addQuiz = addQuiz;

const addQuestion = (db, input) => { // function that adds questions and answers into the database
  console.log("confirmation-------", input);
  const { quiz_id, question, answer1, answer2, answer3, answer4, correct_answer } = input;

  console.log('quiz_id :', quiz_id);

  return db.query(`INSERT INTO questions (quiz_id, question_desc) VALUES ($1, $2) RETURNING *`, [quiz_id, question])
  .then((result) => {
    const question_id = result.rows[0].id

    db.query(`INSERT INTO question_options (quiz_id, question_id, option_1, option_2, option_3, option_4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;` [quiz_id, question_id, answer1, answer2, answer3, answer4, correct_answer])
    .then(result => {

      return (result.rows)
    })
  }).catch(err => {
    res.status(500).json({error: err.message});
  })
};
exports.addQuestion = addQuestion;

const getAllResults = (db, id) => { // function that renders the results of a particular quiz

  return db.query(`SELECT * FROM quiz_results JOIN users ON users.id = user_id JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_results.id = $1`, [id]).then(result => {
    return (result.rows[0])
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
};
exports.getAllResults = getAllResults;

const getMyAttempts = (db, id) => { // function that renders all the results of a particular user

  return db.query(`SELECT * FROM quiz_results JOIN quizzes ON quizzes.id = quiz_id JOIN users ON users.id = quiz_results.user_id WHERE users.id = $1`, [id]).then(result => {
    return (result.rows) //
  }).catch(err => {
    res.status(500).json({error: err.message});
  });
};
exports.getMyAttempts = getMyAttempts;

const addTestResult = (db) => { //need to refactor

  return db.query(`INSERT INTO quiz_results (user_id, quiz_id, user_score, total_score, date, result_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, []).then(result => {
    return(res.rows[0].user_id)
    }).catch(err => {
    res.status(500).json({error: err.message});
  });
};
exports.addTestResult = addTestResult;
