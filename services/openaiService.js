const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function answerWithChunks({ text, chunks }) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: [
          "너는 고객지원 챗봇이다.",
          "반드시 한국어로만 답변한다.",
          "아래에 제공되는 chunks 내용만 근거로 답변한다.",
          "chunks에 근거가 없으면 '해당 문서에서 확인할 수 없어요.'라고 답한다.",
          "불필요한 추측이나 지어내기는 절대 하지 않는다.",
        ].join("\n"),
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `사용자 질문: ${String(text)}`,
          },
          {
            type: "input_text",
            text: "아래 chunks는 문자열 배열(JSON)이다. 이 내용만 근거로 답변해라.",
          },
          {
            type: "input_text",
            text: JSON.stringify(chunks),
          },
        ],
      },
    ],
  });

  return response.output_text ?? "";
}

module.exports = {
  answerWithChunks,
};