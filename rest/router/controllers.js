const passport = require('passport');

const { models: { Room, User }, sequelize } = require('../models');
const { authLocal } = require('../middlewares/index');


module.exports.index = function(req, res) {    
  const userId = req.user.id;  
  User.findOne({
    where: { id: userId },
    include: [{ model: Room }]
  })
  .then(function(user) {            
    res.render('cabinet', {       
      rooms: user.Rooms
    }); 
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

module.exports.users = function(req, res) {
  User.findAll({
    attributes: ['id', 'name', 'login'],
  })
    .then(function(users) {
      res.json(users);
    });
};

module.exports.userInfo = function(req, res) {
  User.findOne({    
    where: {
      id: req.params.id
    }
  })
  .then(function(userInfo) {
    res.json(userInfo);
  });
};