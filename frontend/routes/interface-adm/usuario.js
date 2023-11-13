var express = require('express');
var router = express.Router();

// ROTA CADASTRAR
router.get('/cadastrar', function(req, res, next) {
  res.sendFile('adm/usuario/cadastro-usuario.html', { root: "views" });
});

module.exports = router;