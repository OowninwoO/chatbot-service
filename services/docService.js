const fs = require("fs");
const { splitText } = require("./chunkService");

async function loadDocChunks() {
  const text = fs.readFileSync("docs/delivery-policy.txt", "utf-8");
  const chunks = await splitText(text);
  return chunks;
}

module.exports = {
  loadDocChunks,
};