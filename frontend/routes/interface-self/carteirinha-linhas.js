const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("self/carteirinha-linhas.html", { root: "views" });
});

module.exports = router;
