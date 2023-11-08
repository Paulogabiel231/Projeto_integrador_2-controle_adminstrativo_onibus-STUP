const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.sendFile("scan/concluido.html", { root: "views" });
});

module.exports = router;