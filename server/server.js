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

app.listen(PORT, () => {
  console.log(`Backend active on server http://localhost:${PORT}`);
});
