var express = require('express');
var router = express.Router();
const invoice = require('../server/controllers/InvoiceController');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/',invoice.users);

module.exports = router;
