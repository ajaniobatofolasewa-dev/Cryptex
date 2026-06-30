const express = require("express");
require("dotenv").config();
const crypto = require("crypto");
const cors = require("cors");
const { config } = require("dotenv");
// const path = require('path');

const app = express();

const allowedOrigins = [
  process.env.FRONTEND_URL_IS, // Your live production frontend URL
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(
        new Error("Blocked by CORS policy: This origin is not allowed."),
      );
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 7700;

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

// app.use(express.static(path.join(__dirname, '../client')))

// 1. Tell Express where your static frontend files live
// app.use(express.static(path.join(__dirname, '../client')));

// // 2. The Wildcard Route fallback for index.html
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client', 'index.html'));
// });

app.all("/", (req, res) => {
  res.send("endpoint not found");
  return;
});

app.listen(PORT, () => {
  console.log(`Backend active on server http://localhost:${PORT}`);
});
