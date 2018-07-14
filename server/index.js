const express = require("express");
const api = require("./api");

const app = express();
const PORT = process.env.PORT || 1337;

app
  .use(express.static(`${__dirname}/../public`))
  .use("/api", api)
  .listen(PORT, () => console.log(`Server listening on ${PORT}`));
