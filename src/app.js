const express = require("express");
const path = require("node:path");
const app = express();
const cors = require("cors");

const fs = require("node:fs");

const router = require("./router");

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

/* serve static */

app.use(express.static(path.join(__dirname, "../public")));

// serve REACT APP

const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  // serve REACT resources

  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  // redirect all requests to the REACT index file

  app.get("*", (req, res) => {
    console.error("redirecting to react index file");
    res.sendFile(reactIndexFile);
  });
}

app.use(router);

// ready to export

module.exports = app;
