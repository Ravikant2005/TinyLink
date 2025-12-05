import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import dotenv from "dotenv";
import validUrl from "valid-url";
import cors from "cors";
import Link from "./link.model.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

if (!MONGO_URL) {
  console.error("MONGO_URL not set.");
  process.exit(1);
}

mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("🌿 MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  allowedHeaders: ["Content-Type"]
}));


app.use(express.json());

app.post("/api/links", async (req, res) => {
  try {
    let { url, code } = req.body;
    if (!url) return res.status(400).json({ error: "url required" });
    if (!validUrl.isWebUri(url))
      return res.status(400).json({ error: "invalid URL" });

    const CODE_REGEX = /^[A-Za-z0-9]{6,8}$/;

    if (code) {
      if (!CODE_REGEX.test(code))
        return res.status(400).json({ error: "invalid code format" });
      const exists = await Link.findOne({ code });
      if (exists) return res.status(409).json({ error: "code already exists" });
    } else {
      const alphabet =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const gen = (n = 6) =>
        Array.from({ length: n })
          .map(() => alphabet[Math.floor(Math.random() * alphabet.length)])
          .join("");

      let candidate = gen();
      let attempts = 0;

      while (await Link.findOne({ code: candidate })) {
        candidate = gen();
        attempts++;
        if (attempts > 10) candidate = gen(7);
      }

      code = candidate;
    }

    const link = await Link.create({ code, url });
    res
      .status(201)
      .json({ code, url, short: `${BASE_URL}/${code}`, clicks: link.clicks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal error" });
  }
});

app.get("/api/links", async (req, res) => {
  const links = await Link.find().sort({ created_at: -1 }).lean();
  res.json(links);
});

app.get("/api/links/:code", async (req, res) => {
  const link = await Link.findOne({ code: req.params.code }).lean();
  if (!link) return res.status(404).json({ error: "not found" });
  res.json(link);
});

app.delete("/api/links/:code", async (req, res) => {
  const r = await Link.deleteOne({ code: req.params.code });
  if (r.deletedCount === 0) return res.status(404).json({ error: "not found" });
  res.json({ ok: true });
});

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "TinyLink backend is running",
    time: new Date().toISOString()
  });
});

const staticPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(staticPath));

app.get("/:code", async (req, res, next) => {
  const code = req.params.code;
  if (!/^[A-Za-z0-9]{6,8}$/.test(code)) return next();

  const link = await Link.findOne({ code });
  if (!link) return res.status(404).send("Not found");

  link.clicks += 1;
  link.last_clicked = new Date();
  await link.save();

  res.redirect(302, link.url);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

app.listen(PORT, () =>
  console.log(`🚀 TinyLink server running on port ${PORT}`)
);

