const User = require('../models/user.js');
const driver = require('../models/driver.js');
const vehicle = require('../models/vehicle.js');
const jwt = require('jsonwebtoken');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var hashedPassword = require('password-hash');

const passport = require('passport');
var cookieParser = require('cookie-parser');
exports.homePage = function (req, res) {
  res.sendFile(__dirname + '/index.html');
}

/*
register new user
call:   /register
params in Body:
{
email: {type:"String"},
password: {type:"String"},
name: {type:"String"},
username: {type:"String",unique:"true"},
accountType:{type:String,default:'free',enum:['free','premium']},
accountState:{type:String,default:'personal',enum:['personal','onbehalf','agency']},
blocked:{type:Boolean,default:false}
}

*/

exports.register = function (req, res) {


  console.log("URL: ", "/register")
  console.log("Params: ", req.body)

  if (req.body.email==null || req.body.password==null) {

    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    var newUser = new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
    });
    newUser.save((err, user) => {
      if (err != null) {
        if (err.errors != undefined) {
          if (err.errors.email != undefined) {
            res.status(409).send({ error: "Email already in use." });
          } else if (err.errors.mobile != undefined) {
            res.status(409).send({ error: "Mobile number already in use." })
          }
        }
        else {
          console.log("Error:", err);
        }

      } else {
        var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
        user.password = undefined;
        res.status(202).send({ success: true, user: user, token: 'JWT ' + token, message: 'registered successfully, Email with verification code has been sent to your email account' });
      }
    });
  }
}



/*

call:   /authenticate


Login user with
params in body:{
email:{type:"String"},
password:{type:"String"}
}

returns
JWT Token   => if account verified
=> else return message to verify account first
& userID

*/
exports.authenticate = function (req, res) {
  if (req.body.email != null && req.body.email != "") {
    console.log("in email");
    User.findOne({ email: req.body.email }).select('+password').exec(function (err, user) {
      if (err) {
        throw err;
      } else if (user) {
                  if (user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                      user.password = undefined;
                        var token = jwt.sign({ user: user }, process.env.jwtsecret, { expiresIn: 1000000 });
                        res.cookie('jwtToken', token, { maxAge: 900000, httpOnly: true });

                          vehicle.find({}).then(function(car){
                            driver.find({}).then(function(drive){
                              res.render('dashboard', {
                                token: token,
                                user : user,
                                vehicle:car,
                                driver:drive
                              });
                            })

                        })
                    } else {
                      res.render("login");
                    }
                  }));

      } else {
        res.render("login");
      }

    });
  }
 else {
    res.status(403).send({ message: "Perameters Missing" });
  }
}


exports.login = function(req,res){
  res.render("login");
}

exports.dashboard = function(req,res){
  if(req.cookies.jwtToken){
      vehicle.find({}).then(function(car){
        driver.find({}).then(function(drive){
          res.render('dashboard', {
            vehicle:car,
            driver:drive
          });
        })
      })


  }else{
    res.render("login");
  }
}
