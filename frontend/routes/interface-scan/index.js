const express = require("express");
const router = express.Router();

router.get("/", function (req, res, next) {
    res.sendFile("scan/index.html", { root: "views" });
});

module.exports = router;