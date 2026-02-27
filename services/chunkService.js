const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");

async function splitText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 300,
    chunkOverlap: 50,
  });

  const chunks = await splitter.splitText(text);
  return chunks;
}

module.exports = {
  splitText,
};