require("dotenv").config();

const express = require("express");

const app = express();
app.use(express.json());

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`chatbot-service running on http://localhost:${port}`);
});