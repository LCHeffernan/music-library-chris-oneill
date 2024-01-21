const express = require("express");
const artistRouter = require("./routes/artist");

const app = express();

app.use(express.json());

app.use("/artists", artistRouter);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

module.exports = app;
