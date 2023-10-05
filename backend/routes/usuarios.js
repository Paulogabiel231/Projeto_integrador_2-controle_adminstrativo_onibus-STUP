let express = require('express');
let router = express.Router();

/* GET users listing. */
router.post('/cadastrar', async function(req, res, next) {
  res.json('')
});


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

