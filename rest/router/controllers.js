const { models, sequelize } = require('../models');
const passport = require('passport');
const { authLocal } = require('../middlewares/index');

module.exports.index = function(req, res) {      
  res.render('index', {userAuth:req.user}); 
};

module.exports.private = function(req, res) {       
  return res.render('private', {
    expires: req.session.cookie.expires,
    login: req.user.login,
    name: req.user.name
  }); 
}

module.exports.login = function(req, res) {  
  return res.render('login');
}
