var express = require('express');
var router = express.Router();

// ROTA ENTRAR
router.get('/', function (req, res, next) {
    res.sendFile('adm/auth/login.html', { root: "views" });
});



module.exports = router;