var express = require('express');
var router = express.Router();
const menuController = require('../server/controllers/MenuController');
const authentication = require('../server/middlewares/AuthMiddleware');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/create',authentication.verifyToken,authentication.isAdmin,menuController.add);
router.get('/',menuController.getAll);
router.get('/single/:id',menuController.getSingle);
router.put('/update/:id',authentication.verifyToken,authentication.isAdmin,menuController.updateMenu);
router.delete('/destroy/:id',authentication.verifyToken,authentication.isAdmin,menuController.deleteMenu);

module.exports = router;
