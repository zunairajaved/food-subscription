var express = require('express');
var router = express.Router();
const dishController = require('../server/controllers/DishController');
const authentication = require('../server/middlewares/AuthMiddleware');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/create',authentication.verifyToken,authentication.isAdmin,dishController.add);
router.get('/',dishController.getAll);
router.get('/single/:id',dishController.getSingle);
router.put('/update/:id',authentication.verifyToken,authentication.isAdmin,dishController.updateDish);
router.delete('/destroy/:id',authentication.verifyToken,authentication.isAdmin,dishController.deleteDish);

module.exports = router;
