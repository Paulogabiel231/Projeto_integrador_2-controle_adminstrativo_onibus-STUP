var express = require('express');
var router = express.Router();

// ROTA CADASTRAR
router.get('/cadastrar', function(req, res, next) {
  res.sendFile('adm/usuario/cadastro-usuario.html', { root: "views" });
});

// ROTA REGISTROS
router.get('/registro', function (req, res, next) {
  res.sendFile('adm/usuario/registro-usuario.html', { root: "views" });
});

router.get('/editar/:id', function (req, res, next) {
  res.sendFile('adm/usuario/editar-usuario.html', { root: "views" });
});

router.get('/visualizar/:id', function (req, res, next) {
  res.sendFile('adm/usuario/visualizar-usuario.html', { root: "views" });
});

// ROTA ENTRAR 
router.get('/login', function(req, res, next) {
  res.sendFile('adm/auth/login.html', { root: "views" });
});

module.exports = router;