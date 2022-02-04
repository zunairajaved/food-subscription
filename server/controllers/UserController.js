const User = require("../models").User;
const Subscription = require("../models").Subscription;
const UserMeals = require("../models").UserMeals;
const DishMenu = require("../models").DishMenu;
const Dish = require("../models").Dish;
const Invoice = require("../models").Invoice;
const config = require("../../config");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    role:req.body.role
  })
    .then(user => {
        res.status(200).send({
            id: user.id,
            fullName:user.fullName,
            email: user.email,
            role: user.role,
        });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
        var token = jwt.sign({ id: user.id }, config.secretKey, {
          expiresIn: 86400 // 24 hours
        }); 
          res.status(200).send({
            id: user.id,
            fullName:user.fullName,
            email: user.email,
            role: user.role,
            accessToken: token
          });
        })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.getAll = (req, res) => {
    User.findAll({
        attributes: ['id', 'fullName','email','role']
    })
      .then(users => {
          res.status(200).send(users);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getProfile = (req, res) => {
    User.findByPk(req.userId,
        {attributes: ['id', 'fullName','email','role']})
      .then(user => {
          res.status(200).send(user);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.updateProfile = (req, res) => {
    User.update({
        fullName:req.body.fullName,
        email:req.body.email,
        role:req.body.role
    },{where:{id:req.userId}})
    .then(()=> {
        res.status(200).send({message:'Profile updated successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteUser = (req, res) => {
    User.destroy({where:{id:req.body.id}})
    .then(()=> {
        res.status(200).send({message:'User deleted successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  var timeFrom = (X) => {
    var dates = [];
    for (let I = 0; I < Math.abs(X); I++) {
        dates.push(new Date(new Date().getTime() - ((X >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toLocaleString());
    }
    return dates;
}
  exports.userSubscription = (req, res) => {
  var days = timeFrom(-7);
    const data = {
      userId:req.userId,
      menuId:req.body.menuId,
      startDate:days[0],
      endDate:days[days.length-1],
      plan:req.body.plan
    }
    Subscription.create(data)
    .then((subs)=> {
      DishMenu.findAll({where:{menuId:subs.menuId},
        attributes: ['dishId']
      }).then((dishes)=>{
        for (key in days) {
          UserMeals.create({
            userId:req.userId,
            day:days[key],
            dishId:dishes[key].dishId,
          });
        }
      })
        res.status(200).send(subs);
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.cancelSingleSubscription = (req, res) => {
    UserMeals.update({
        status:false,
    },{where:{id:req.params.id}})
    .then(()=> {
        res.status(200).send({message:'Daily Subscription canceled successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  exports.cancelSubscription = (req, res) => {
    Subscription.update({status:false},{where:{userId:req.userId}})
    UserMeals.update({
        status:false,
    },{where:{userId:req.userId}})
    .then(()=> {
        res.status(200).send({message:'Subscription canceled successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  var checkSubscription = async (user) =>{
    var sum = 0;
    var arr = [];
        var dishes = await UserMeals.findAll({where:{userId:user,status:true},
          attributes:['dishId']});
          for(x in dishes){
           arr.push(dishes[x].dishId);
          }
            var prices = await Dish.findAll({where:{id: arr}});
            for(x in prices){
              sum = sum + prices[x].price;
            }
            return sum;
  }
  exports.invoices = async (req, res) => {
   var users =  await Subscription.findAll({ where: {status:true},attributes:['userId']});

  if(users !== null){
    for(x in users){
      Invoice.create({
        userId:users[x].userId,
        total:await checkSubscription(users[x].userId)
      });
    }
  }
    res.status(200).send({message:'Invoices Generated'});
  };