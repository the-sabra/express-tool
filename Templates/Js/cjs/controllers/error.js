const rootDir = require("../util/path");
const path = require("path");
exports.get404 = (req, res, next) => {
  res.sendFile(path.join(rootDir, "public", "error.html"));
};
