require("dotenv").config();

const express = require("express");
const qnaRoutes = require("./routes/qna");

const app = express();
app.use(express.json());

app.use(qnaRoutes);

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`chatbot-service running on http://localhost:${port}`);
});