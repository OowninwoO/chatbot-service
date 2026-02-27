const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 20,
  });

  const chunks = await splitter.splitText(text);
  return chunks;
}

module.exports = {
  splitText,
};