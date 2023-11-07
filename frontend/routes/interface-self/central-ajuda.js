const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("self/central-ajuda.html", { root: "views" });
});

module.exports = router;