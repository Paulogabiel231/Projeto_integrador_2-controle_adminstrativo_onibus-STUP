const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.sendFile("scan/index.html", { root: "views" });
});

router.get("/true/:id", function (req, res, next) {
    res.sendFile("scan/true.html", { root: "views" });
});

router.get("/true/meia/:id", function (req, res, next) {
    res.sendFile("scan/true-meia.html", { root: "views" });
});

router.get("/false", function (req, res, next) {
    res.sendFile("scan/false.html", { root: "views" });
});

router.get("/undefined", function (req, res, next) {
    res.sendFile("scan/undefined.html", { root: "views" });
});

module.exports = router;