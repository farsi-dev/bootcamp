const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

exports.signin = async(req, res, next) => {
  try {
    const user = await db.User.findOne({
      email: req.body.email
    });
    let {id, username, email} = user;
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch){
      let token = jwt.sign({
        id,
        username,
        email
      }, process.env.SECRET_KEY)
      console.log(token)
      return res.status(200).json({
       id,
       email,
       username,
       token
     });
    } else {
      return next({
        status: 400,
        message: "Invalid email and/or password"
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: "Invalid email and/or password"
    });
  }
}


exports.signup = async(req, res, next) => {
  try {
    const user = await db.User.create(req.body);
    let {id, username, email} = user;
    let token = jwt.sign({
      id,
      username,
      email
    }, process.env.SECRET_KEY)
    return res.status(200).json({
      id,
      username,
      email,
      token
    });
  } catch (err) {
    if(err.code === 11000){
      err.message = "Sorry, this username has been taken"
    }
    return next({
      status: 400,
      message: err.message
    })
  }
}