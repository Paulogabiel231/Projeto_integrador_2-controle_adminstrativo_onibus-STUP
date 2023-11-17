var express = require('express');
var router = express.Router();

// ROTA CADASTRAR
router.get('/cadastrar', function(req, res, next) {
  res.sendFile('adm/clientes/cadastro-cliente.html', { root: "views" });
});

// ROTA REGISTROS
router.get('/registro', function(req, res, next) {
    res.sendFile('adm/clientes/registro-cliente.html', { root: "views" });
});

module.exports = router;