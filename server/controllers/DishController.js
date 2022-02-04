const Dish = require("../models").Dish;
// const config = require("../../config");

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcryptjs");

exports.add = (req, res) => {
  Dish.create({
    name: req.body.name,
    price: req.body.price,
  })
    .then(dish => {
        res.status(200).send(dish);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
  exports.getAll = (req, res) => {
    Dish.findAll()
      .then(dishes => {
          res.status(200).send(dishes);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getSingle = (req, res) => {
    Dish.findByPk(req.params.id)
      .then(dish => {
          res.status(200).send(dish);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.updateDish = (req, res) => {
    Dish.update({
        name: req.body.name,
        price: req.body.price,
    },{where:{id:req.params.id}})
    .then(()=> {
        res.status(200).send({message:'Dish updated successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteDish = (req, res) => {
    Dish.destroy({where:{id:req.params.id}})
    .then(()=> {
        res.status(200).send({message:'Dish deleted successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };