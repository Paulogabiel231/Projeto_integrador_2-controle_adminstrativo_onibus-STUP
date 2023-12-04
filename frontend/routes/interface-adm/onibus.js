var express = require('express');
var router = express.Router();

// ROTA CADASTRAR
router.get('/cadastrar', function (req, res, next) {
    res.sendFile('adm/onibus/cadastro-onibus.html', { root: "views" });
});

// ROTA REGISTROS
router.get('/registro', function (req, res, next) {
    res.sendFile('adm/onibus/registro-onibus.html', { root: "views" });
});

router.get('/editar/:id', function (req, res, next) {
    res.sendFile('adm/onibus/editar-onibus.html', { root: "views" });
});

router.get('/visualizar/:id', function (req, res, next) {
    res.sendFile('adm/onibus/visualizar-onibus.html', { root: "views" });
});

module.exports = router;