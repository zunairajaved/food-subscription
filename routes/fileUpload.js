var express = require('express');
var router = express.Router();
var multer  = require('multer');
const InvoicImage = require("../server/models").InvoicImage;
const authentication = require('../server/middlewares/AuthMiddleware');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/images');
    },
    filename: (req, file, cb) => {
      console.log(file);
      var filetype = '';
      if(file.mimetype === 'image/gif') {
        filetype = 'gif';
      }
      if(file.mimetype === 'image/png') {
        filetype = 'png';
      }
      if(file.mimetype === 'image/jpeg') {
        filetype = 'jpg';
      }
      cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({storage: storage});
router.post('/upload/:id',authentication.verifyToken,authentication.isClient,upload.single('file'),function(req, res, next) {
    console.log(req.file.path,req.params.id);
    if(!req.file) {
      res.status(500);
      return next(err);
    }
    InvoicImage.create({
        invoiceId:req.params.id,
        imagePath:req.file.path
      });
    res.json({ fileUrl: 'http://localhost:3000/images/' + req.file.filename });
  });
  module.exports = router;