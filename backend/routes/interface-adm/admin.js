const express = require("express");
const router = express.Router();

const verifyToken = require("../../middlewares/auth");

router.get("/", verifyToken, function (req, res, next) {
  res.json({ mensagem: "Bem-vindo à página de administração." });
});

module.exports = router;