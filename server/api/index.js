const { Router } = require("express");

const api = Router();

api.get("/", (req, res) =>
  res.json({ data: {}, error: false, message: "Ouch! You've hit our API" })
);

module.exports = api;
