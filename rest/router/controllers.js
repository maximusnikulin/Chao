const passport = require('passport');

const { models, sequelize } = require('../models');
const { authLocal } = require('../middlewares/index');


module.exports.index = function(req, res) {   
  res.render('index', { userAuth: req.user }); 
};

module.exports.private = function(req, res) {      
  return res.render('private', {
    expires: req.session.cookie.expires,
    login: req.user.login,
    name: req.user.name
  }); 
};

module.exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports.login = function(req, res) {  
  return res.render('login');
};

module.exports.passportLocalAuth = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

module.exports.passportGoogleAuth = passport.authenticate('google', { 
  scope: ['profile', 'email']
});

module.exports.passportGoogleCallback = passport.authenticate('google', { 
  failureRedirect: '/login' 
});
