var express = require('express');
var router = express.Router();

// ROTA CADASTRAR
router.get('/cadastrar', function(req, res, next) {
  res.sendFile('adm/motorista/cadastro-motorista.html', { root: "views" });
});

// ROTA REGISTROS
router.get('/registro', function (req, res, next) {
  res.sendFile('adm/motorista/registro-motorista.html', { root: "views" });
});


module.exports = router;