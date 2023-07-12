const express = require("express");
const rootDir = require("../util/path");
const path = require("path");
const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

module.exports = router;
