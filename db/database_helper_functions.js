
const generateRandomString = () => {
  return Math.random().toString(36).slice(-6);
};

const getQuiz = (db, id) => {

  return db.query(`SELECT * FROM quizzes WHERE quizzes.id = $1;`, [id]).then(result => {
    return (result.rows[0]); //render the appropriate quiz given the quiz id
  })

    .catch(err => {
      console.log(err);
    });
};
exports.getQuiz = getQuiz;

const getQuizIdFromURL = async function(db, url) {

  const id = await db.query(`SELECT id FROM quizzes WHERE quizzes.url = $1`, [url]);
  return id;

};

const getQuizFromUserURL = async (db, url) => { // function that renders the quiz with a user URL
  const qidPromise = await getQuizIdFromURL(db, url);
  const quizidFromURL = qidPromise.rows[0].id;

  return db.query(`SELECT quizzes.title, quizzes.description, quizzes.id as quizId, 
    questions.id as questionId FROM quizzes 
    JOIN questions ON questions.quiz_id = quizzes.id
    WHERE quizzes.id = $1`, [quizidFromURL]).then(result => {
    console.log(result.rows[0]);
    return (result.rows[0]);
  })
    .catch(err => {
      console.log(err);
    });


};
exports.getQuizFromUserURL = getQuizFromUserURL;

const addQuiz = (db, input) => {

  const { quiz_title, quiz_description, is_public } = input;
  const quizURL = generateRandomString();

  return db.query(`INSERT INTO quizzes (user_id, public, description, title, url) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [1, is_public, quiz_description, quiz_title, quizURL]).then(result => {
    return (result.rows[0].id);
  })
    .catch(err => {
      console.log(err.message);
    });
};
exports.addQuiz = addQuiz;

const addQuestion = (db, input, quizId) => {

  const { question, option1, option2, option3, option4, answer } = input;

  return db.query(`INSERT INTO questions (quiz_id, question_desc,  option_1, option_2, option_3, option_4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [quizId, question, option1, option2, option3, option4, answer])
    .then((result) => {
      return result.rows[0].quiz_id;
    }).catch(err => {
      console.log(err);
    });
};
exports.addQuestion = addQuestion;

const getQuizRandomURL = (db, id) => {

  return db.query(`SELECT url FROM quizzes WHERE id=$1`, [id]).then(result =>
    result.rows[0].url
  ).catch(err => {
    console.log(err);
  }
  );
};
exports.getQuizRandomURL = getQuizRandomURL;

const getAllResults = (db, id) => { // function that renders the results of a particular quiz

  return db.query(`SELECT * FROM quiz_results JOIN users ON users.id = user_id JOIN quizzes ON quizzes.id = quiz_id WHERE quiz_results.id = $1`, [id]).then(result => {
    return (result.rows[0]);
  }).catch(err => {
    console.log(err);
  });
};
exports.getAllResults = getAllResults;

const getMyAttempts = (db, id) => { // function that renders all the results of a particular user

  return db.query(`SELECT quizzes.title, quiz_results.user_score,quiz_results.total_score, to_char( quiz_results.date,'Day Mon dd, yyyy HH12:MI AM') as date FROM quiz_results JOIN quizzes ON quizzes.id = quiz_id JOIN users ON users.id = quiz_results.user_id WHERE users.id = $1 ORDER BY date DESC`, [id]).then(result => {
    return (result.rows); //
  }).catch(err => {
    console.log(err);
  });
};
exports.getMyAttempts = getMyAttempts;

const addTestResult = (db) => { //need to refactor
  return db.query(`INSERT INTO quiz_results (user_id, quiz_id, user_score, total_score, date, result_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, []).then(result => {
    return (result.rows[0].user_id);
  }).catch(err => {
    console.log(err);
  });
};
exports.addTestResult = addTestResult;

const getQuizData = (db, id) => {

  return db.query(`SELECT questions.* FROM questions 
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE quizzes.id = $1`, [id])
    .then(result => {
      result.rows[0]['quizID'] = id;
      /*   console.log("--------------", result.rows, id); */
      return result.rows[0];
    })
    .catch(err => console.log(err));

};

exports.getQuizData = getQuizData;

const checkAnswer = (db, userInput, quizId, questionId) => {
  return db.query(`SELECT answer FROM questions 
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE quizzes.id = $1
    AND questions.id= $2`, [quizId, questionId])

    .then(result => {
      if (result.rows[0].answer === userInput) {
        return { isTrue: true };
      } else {
        return { isTrue: false, answer: result.rows[0].answer };
      }

    })
    .catch(err => console.log(err));

};

exports.checkAnswer = checkAnswer;

const lastQuestionId = async (db, quizId) => {
  const lastQId = await db.query(`SELECT id FROM questions WHERE quiz_id = $1 ORDER BY id DESC`, [quizId]);
  return lastQId;
};


const getNextQuestion = async (db, quizId, questionId) => {
  const lastQIdP = await lastQuestionId(db, quizId);
  console.log('lastQIdP :', lastQIdP);
  const maxQId = lastQIdP.rows[0].id;

  return db.query(`SELECT questions.* FROM questions 
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE quizzes.id = $1
    AND questions.id= $2`, [quizId, questionId])
    .then(result => {
      result.rows[0]['maxId'] = maxQId;
      console.log('-------', result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err));
};
exports.getNextQuestion = getNextQuestion;



const insertUserAttempt = (db, quizId, questionId, isTrue) => {

  return db.query(`INSERT INTO quiz_attempts(user_id, quiz_id,question_id, is_true)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT(question_id) DO UPDATE SET is_true = EXCLUDED.is_true RETURNING*;`, [1, quizId, questionId, isTrue])
    .then(result => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err));

};

exports.insertUserAttempt = insertUserAttempt;

const getTotalQuestion = async (db, quizId) => {
  const data = await db.query(`SELECT COUNT(question_id) as total FROM quiz_attempts
    WHERE quiz_id = $1
    GROUP BY quiz_id ;`, [quizId]);
  return data;
};

const resultData = async (db, quizId) => {


  const data = await db.query(`SELECT COUNT(quiz_attempts.is_true) as userscore, quizzes.title FROM quizzes JOIN quiz_attempts ON quiz_attempts.quiz_id = quizzes.id  WHERE quizzes.id = $1
    AND quiz_attempts.is_true = 'true'
    GROUP BY quizzes.id, quizzes.title;`, [quizId]);
  return data;
};

const getQuizResult = async (db, quizId) => {
  const totalQP = await getTotalQuestion(db, quizId);
  const totalScore = totalQP.rows[0].total;
  const qdataP = await resultData(db, quizId);
  const { title, userscore } = qdataP.rows[0];

  return db.query(`INSERT INTO quiz_results(user_id, quiz_id, user_score, total_score, result_url) VALUES($1, $2, $3, $4, $5) RETURNING *; `, [1, quizId, userscore, totalScore, generateRandomString()])
    .then(result => {
      result.rows[0].title = title;
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch(err => console.log(err));

};
exports.getQuizResult = getQuizResult;

exports.getQuizResult = getQuizResult;

const addRandomQuiz = (db, data) => {

  return db.query(`INSERT INTO quizzes(user_id, public, description, title, url)
    VALUES($1, $2, $3, $4, $5) RETURNING *;`, [1, true, "Random generated quiz", data, generateRandomString()]).then(result => {
    return result.rows[0].id;
  });

};

exports.addRandomQuiz = addRandomQuiz;


const randomHelper = async (db, quizId, questionData) => {

  const { question, correct_answer, incorrect_answers } = questionData;
  await db.query(`INSERT INTO questions (quiz_id, question_desc, option_1, option_2, option_3, option_4, answer) VALUES ($1, $2, $3, $4, $5, $6, $7);`, [quizId, question, correct_answer, incorrect_answers[0], incorrect_answers[1], incorrect_answers[2], correct_answer]);
};

const addRandomQuestions = async (db, quizId, apiData) => {

  for (const qdata of apiData) {
    await randomHelper(db, quizId, qdata);
  }
  return ("done");
};

exports.addRandomQuestions = addRandomQuestions;

const getUserQuizResult = (db, quizURL) => {

  return db.query(`SELECT * FROM quiz_results JOIN quizzes ON quiz_id = quizzes.id JOIN users ON users.id = quiz_results.user_id WHERE result_url = $1;`, [quizURL]).then(result => {
    console.log('result.rows[0] :', result.rows[0]);
    return result.rows[0];
  })
    .catch(err => console.log(err));
};
exports.getUserQuizResult = getUserQuizResult;

