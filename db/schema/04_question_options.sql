-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS questions_options CASCADE;

CREATE TABLE questions_options (
  id SERIAL PRIMARY KEY NOT NULL,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  question_id INTEGER REFERENCES questions(id) ON DELETE CASCADE,
  option_1 VARCHAR(255) NOT NULL,
  option_2 VARCHAR(255) NOT NULL,
  option_3 VARCHAR(255) NOT NULL,
  option_4 VARCHAR(255) NOT NULL,
  answer VARCHAR(255) NOT NULL
);
