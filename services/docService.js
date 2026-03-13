const fs = require("fs");
const { splitText } = require("./chunkService");

async function loadDocChunks() {
  const text = fs.readFileSync("docs/smart_feeder_remote_faq.txt", "utf-8");
  const chunks = await splitText(text);
  return chunks;
}

module.exports = {
  loadDocChunks,
};