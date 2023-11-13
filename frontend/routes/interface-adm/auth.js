var express = require("express");
var router = express.Router();

router.get("/entrar", function (req, res, next) {
  res.render("adm/clientes/auth/entrar.html", { title: "Login", layout: "layouts/layout" });
});

router.get("/sair", function (req, res, next) {
  res.clearCookie("jwt");
  res.redirect("/");
});

module.exports = router;
