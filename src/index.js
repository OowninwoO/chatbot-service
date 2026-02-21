const app = require("./app");

const port = 3000;
app.listen(port, () => {
  console.log(`chatbot-service running on http://localhost:${port}`);
});