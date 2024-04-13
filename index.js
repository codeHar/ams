const express = require("express");
require("dotenv").config();
require("./database");

const app = express();
const PORT = process.env.PORT || 3306;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server running at localhost:${PORT}`);
});
