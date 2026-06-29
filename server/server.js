const express = require("express");
require("dotenv").config();
const crypto = require("crypto");
const cors = require("cors");
const { config } = require("dotenv");

const app = express();
const PORT = process.env.PORT || 7700;

app.use(cors());
app.use(express.json());

app.post("/api/hash", (req, res) => {
  const { text, algorithm } = req.body;

  if (!text || !algorithm) {
    return res
      .status(400)
      .json({ error: "Missing plain text or hashing algorithm" });
  }

  try {
    const validAlgors = ["sha256", "sha1", "md5"];

    if (!validAlgors.includes(algorithm.toLowerCase())) {
      return res.status(400).json({ error: "Unsupported algorithm type" });
    }

    const calculatedHash = crypto
      .createHash(algorithm)
      .update(text)
      .digest("hex");

    return res.json({ hash: calculatedHash });
  } catch (error) {
    console.error(error + "the error message sha");
    return res
      .status(500)
      .json({ error: "Internal cryptocraphic processing faliure" });
  }
});

app.post("/api/verify", (req, res) => {
  const { text, expectedHash, algorithmProvided } = req.body;

  // const alog = ["none", "NONE"];

  try {
    if (!text || !expectedHash || !algorithmProvided) {
      return res
        .status(400)
        .json({ error: "fields are empty or algorithm not selected" });
    }

    const validAlgos = ["sha256", "sha1", "md5"];
    if (!validAlgos.includes(algorithmProvided.toLowerCase())) {
      return res
        .status(400)
        .json({ error: "Unsupported or invalid algorithm selected." });
    }

    const rawText_toHash = crypto
      .createHash(algorithmProvided)
      .update(text)
      .digest("hex");

    if (rawText_toHash !== expectedHash) {
      return res.json({ match: false });
    }

    return res.json({ match: true });
  } catch (error) {
    console.error("Backend processing error: " + error);
  }
});

app.listen(PORT, () => {
  console.log(`Backend active on server http://localhost:${PORT}`);
});
