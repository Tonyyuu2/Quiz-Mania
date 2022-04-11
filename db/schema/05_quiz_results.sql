-- Drop and recreate Widgets table (Example)

DROP TABLE IF EXISTS quiz_results CASCADE;

CREATE TABLE quiz_results (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  user_score INTEGER NOT NULL,
  total_score INTEGER NOT NULL,
  date DATE,
  result_url VARCHAR(255)
);
