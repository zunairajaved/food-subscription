const nodemailer = require('nodemailer');
const User = require("../models").User;
const Invoice = require("../models").Invoice;
let transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    auth: {
      user: process.env.AUTH_USER,
      pass: process.env.AUTH_PASSWORD
    }
  });
  var users = async () =>{
      var users = [];
      var n = [];
      var temp = await Invoice.findAll({where:{isPaid:false},
    attributes:['userId','total']});
    for (x in temp){
     users.push(temp[x].userId);
    }
    var data = await User.findAll({where:{id:users},attributes:['email','fullName']});
    for(i in data )
    {
        d = {
            email:data[i].email,
            total:temp[i].total,
            fullName:data[i].fullName
        }
        n.push(d);
    }
    return n;
  }  
  exports.users = async (req , res) =>{
      var test = await users();
      for(x in test){
        let messageOptions = {
            from: process.env.AUTH_USER,
            to: test[x].email,
            subject: 'Invoice',
            text: 'Hi' + " "+ test[x].fullName + " "+'your total payable amount is' + " "+ test[x].total
          };
        
          transporter.sendMail(messageOptions, function(error, info) {
            if (error) {
              throw error;
            } else {
              console.log('Email successfully sent!');
            }
        });
      }
      res.status(200).send({message:'email sent'});
  };