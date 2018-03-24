const { models, sequelize } = require('../models');
const passport = require('passport');

module.exports.index = function(req, res) {
  console.log(req.session)  
  return res.render('index', {foo: 'bar'});
};

module.exports.private = function(req, res) {  
  return res.render('private')
}

module.exports.auth = function(req, res) {  
  return res.send('auth');
}

module.exports.login = function(req, res) {  
  return res.render('login');
}
