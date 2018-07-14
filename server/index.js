const express = require("express");
const userAPI = require("./api/users");

const app = express();
const PORT = process.env.PORT || 1337;
var db = require("./db");

db.connect(
  db.MODE_PRODUCTION,
  () => console.log("index.js: DB connected")
);

app
  .use(express.static(`${__dirname}/../public`))
  .use("/api/users", userAPI)
  .listen(PORT, () => console.log(`index.js Server listening on ${PORT}`));
