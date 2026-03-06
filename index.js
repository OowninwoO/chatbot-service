require("dotenv").config();

const express = require("express");
const qnasRoutes = require("./routes/qnas");

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.use(qnasRoutes);

const port = Number(process.env.PORT);

app.listen(port, () => {
  console.log(`chatbot-service running on http://localhost:${port}`);
});