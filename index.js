require("dotenv").config();

const app = require("./src/app");

const port = Number(process.env.PORT);
app.listen(port, () => {
  console.log(`chatbot-service running on http://localhost:${port}`);
});