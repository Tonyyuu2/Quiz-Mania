Quiz-Mania - A Quiz Creator App That You Can Share With Friends!
=========

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run all of the /db/schema/ to create the required database tables
  - /01_users.sql
  - /02_quizzes.sql
  - /03_questions.sql
  - /04_quiz_results.sql
  - /05_quiz_attempts.sql
6. Run all of the seeding queries in /db/seeds/ to populate the database
7. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
8. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
9. Visit `http://localhost:8080/`

## Features

- users can create quizzes
- users can make their quiz unlisted (make them private and not available on the home page, but if someone  knows the quiz URL they can visit and take the quiz)
- users can share a link to a single quiz
- users can see a list of public quizzes
- users can see a list of public quizzes on the home page
- users can attempt a quiz
- users can see the results of their recent attempt
- users can share a link to the result of their attempt


## Dependencies

- Node 10.x or above
- NPM 5.x or above
- PG 6.x
- Ejs
- Express
- Morgan 
- Nodemon 
- Chalk
- Dotenv
- Sass
- Body-parser
- Cookie-session

