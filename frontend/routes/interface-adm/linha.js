var express = require('express');
var router = express.Router();

// ROTA CADASTRAR
router.get('/cadastrar', function(req, res, next) {
  res.sendFile('adm/linhas/cadastro-linha.html', { root: "views" });
});

// ROTA REGISTROS
router.get('/registros', function(req, res, next) {
    res.sendFile('adm/linha/registro-linha.html', { root: "views" });
});

module.exports = router;