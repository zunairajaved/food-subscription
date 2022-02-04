const Menu = require("../models").Menu;
const Dish = require("../models").Dish;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.add = (req, res) => {
  Menu.create({
    name: req.body.name,
  })
    .then(menu => {
      if(req.body.dishes){
        Dish.findAll({
          where:{
            id:{
              [Op.or]:req.body.dishes
            }
          }
        }).then(dishes=>{
          menu.setDishes(dishes).then(()=>res.status(200).send(menu))})
      }
        
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
  exports.getAll = (req, res) => {
    Menu.findAll({
      include: [{
        model:Dish, 
        attributes: ['id', 'name'], 
        as:'dishes'
    }]
    })
      .then(menues => {
          res.status(200).send(menues);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getSingle = (req, res) => {
    Menu.findByPk(req.params.id)
      .then(menu => {
          res.status(200).send(menu);
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.updateMenu = (req, res) => {
    Menu.update({
        name: req.body.name,
    },{where:{id:req.params.id}})
    .then(()=> {
        res.status(200).send({message:'Menu updated successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.deleteMenu = (req, res) => {
    Menu.destroy({where:{id:req.params.id}})
    .then(()=> {
        res.status(200).send({message:'Menu deleted successfully'});
    })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };