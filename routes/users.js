var express = require('express');
var router = express.Router();
const userController = require('../server/controllers/UserController');
const authentication = require('../server/middlewares/AuthMiddleware');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/signUp',userController.signup);
router.post('/signIn',userController.signin);
router.get('/',userController.getAll);
router.get('/profile',authentication.verifyToken,userController.getProfile);
router.put('/profile',authentication.verifyToken,userController.updateProfile);
router.delete('/destroy',authentication.verifyToken,authentication.isAdmin,userController.deleteUser);
router.post('/subscription',authentication.verifyToken,authentication.isClient,userController.userSubscription);
router.get('/cancel/daily/subscription/:id',authentication.verifyToken,authentication.isClient,userController.cancelSingleSubscription);
router.get('/cancel/subscription/:id',authentication.verifyToken,authentication.isClient,userController.cancelSubscription);
router.get('/invoices',userController.invoices);
module.exports = router;
