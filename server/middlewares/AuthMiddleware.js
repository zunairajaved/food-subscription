const jwt = require("jsonwebtoken");
const config = require("../../config");
const User = require("../models").User;
module.exports = {
verifyToken : (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
},

isAdmin : (req, res, next) => {
  User.findByPk(req.userId).then(user => {
        if (user.role === "admin") {
          next();
          return;
        }else{
     return res.status(403).send({
        message: "Require Admin Role!"
      });
    }
  });
},
isClient : (req, res, next) => {
    User.findByPk(req.userId).then(user => {
          if (user.role === "client") {
            next();
            return;
          }else{
       return res.status(403).send({
          message: "Require Client Role!"
        });
      }
    });
  },
}