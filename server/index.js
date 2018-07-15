const express = require('express');

const app = express();
const PORT = process.env.PORT || 1337;
const db = require('./db');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');

db.connect(
  db.MODE_PRODUCTION,
  function() {
    console.log('app.js: DB connected');
  }
);

app
  .use(express.static(`${__dirname}/../public`))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use('/api/users', usersRouter)
  .use('/api/items', itemsRouter)
  .listen(PORT, () => console.log(`Server listening on ${PORT}`));
