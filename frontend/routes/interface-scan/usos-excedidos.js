const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.sendFile("self/usos-excedidos.html", { root: "views" });
});

module.exports = router;