var express = require('express');
var router = express.Router();

// ROTA INDEX
router.get('/', function (req, res, next) {
  res.sendFile('adm/index.html', { root: "views" });
});

// ROTA RECARGA
router.get('/recarga', function (req, res, next) {
  res.sendFile('adm/recarga.html', { root: "views" });
});




// ROTA CADASTRAR
router.get('/cadastrar', function(req, res, next) {
  res.sendFile('adm/cliente/cadastro-cliente.html', { root: "views" });
});

// ROTA REGISTROS
router.get('/registro', function(req, res, next) {
    res.sendFile('adm/cliente/registro-cliente.html', { root: "views" });
});

router.get('/editar/:id', function (req, res, next) {
  res.sendFile('adm/cliente/editar-cliente.html', { root: "views" });
});

router.get('/visualizar/:id', function (req, res, next) {
  res.sendFile('adm/cliente/visualizar-cliente.html', { root: "views" });
});

module.exports = router;