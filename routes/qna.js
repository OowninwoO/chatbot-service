const express = require("express");
const readXlsxFile = require("read-excel-file/node");
const stringSimilarity = require("string-similarity");

const router = express.Router();

async function loadQnaFromXlsx(filePath) {
  const rows = await readXlsxFile(filePath);

  const headers = rows[0].map((v) => String(v).trim().toLowerCase());
  const qIdx = headers.indexOf("question");
  const aIdx = headers.indexOf("answer");

  const result = [];
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const q = String(row[qIdx]).trim();
    const a = String(row[aIdx]).trim();
    result.push({ question: q, answer: a });
  }

  return result;
}

router.get("/api/qna", async (req, res) => {
  const filePath = process.env.QNA_XLSX_PATH;
  const qna = await loadQnaFromXlsx(filePath);

  res.json({ ok: true, count: qna.length, qna });
});

router.post("/api/qna/similarity", async (req, res) => {
  const text = String(req.body.text).trim();

  const filePath = process.env.QNA_XLSX_PATH;
  const qna = await loadQnaFromXlsx(filePath);

  const matches = [];
  for (let i = 0; i < qna.length; i++) {
    const item = qna[i];
    matches.push({
      question: item.question,
      answer: item.answer,
      score: Number(stringSimilarity.compareTwoStrings(text, item.question).toFixed(3)),
    });
  }

  let best = matches[0];
  for (let i = 1; i < matches.length; i++) {
    if (matches[i].score > best.score) best = matches[i];
  }

  const bestOrNull = best.score >= 0.5 ? best : null;

  res.json({
    ok: true,
    text,
    count: matches.length,
    matches,
    best: bestOrNull,
    message: bestOrNull ? "유사한 질문을 찾았습니다." : "유사도가 낮아 RAG로 넘어가야 합니다. (RAG 미구현)",
  });
});

module.exports = router;