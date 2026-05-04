const express = require("express");
const cors = require("cors");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const natural = require("natural");

const app = express();
app.use(cors());

const upload = multer();

const tokenizer = new natural.WordTokenizer();

app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    console.log("🔥 Request received");

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const jobDesc = req.body.jobDesc?.toLowerCase();

    if (!jobDesc) {
      return res.status(400).json({ error: "No job description provided" });
    }

    const data = await pdfParse(req.file.buffer);
    const resumeText = data.text.toLowerCase();

    const resumeTokens = tokenizer.tokenize(resumeText);
    const jobTokens = tokenizer.tokenize(jobDesc);

    // 🔥 Clean keywords
    const keywords = jobTokens.filter(
      (word) =>
        word.length > 3 &&
        !["with", "and", "for", "the", "this", "that"].includes(word)
    );

    // 🔥 Keyword match score
    let matchCount = 0;
    let missing = [];

    keywords.forEach((word) => {
      if (resumeTokens.includes(word)) {
        matchCount++;
      } else {
        missing.push(word);
      }
    });

    const keywordScore = matchCount / keywords.length;

    // 🔥 TF-IDF weight factor (light usage)
    const tfidf = new natural.TfIdf();
    tfidf.addDocument(resumeText);
    tfidf.addDocument(jobDesc);

    let tfidfScore = 0;

    keywords.forEach((word) => {
      tfidfScore += tfidf.tfidf(word, 0);
    });

    tfidfScore = tfidfScore / keywords.length;

    // 🔥 Final combined score
    const finalScore = Math.min(
      100,
      Math.round((0.7 * keywordScore + 0.3 * tfidfScore) * 100)
    );

    console.log("🎯 Score:", finalScore);

    res.json({
      score: finalScore,
      suggestions: missing.slice(0, 5).map(
        (k) => `Add "${k}" to improve your resume`
      ),
    });

  } catch (error) {
    console.error("❌ ERROR:", error);
    res.status(500).send("Error processing file");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});