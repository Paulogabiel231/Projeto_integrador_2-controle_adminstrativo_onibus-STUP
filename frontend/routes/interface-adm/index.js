var express = require('express');
var router = express.Router();

// ROTA INDEX
router.get('/', function(req, res, next) {
  res.sendFile('adm/index.html', { root: "views" });
});

// ROTA RECARGA
router.get('/recarga', function(req, res, next) {
  res.sendFile('adm/recarga.html', { root: "views" });
});

module.exports = router;



