const { models, sequelize } = require('../models');


module.exports.index = function(req, res) {  
  return res.render('index', {foo: 'bar'});
};

module.exports.private = function(req,res) {
  return res.render('private')
}

module.exports.auth = function(req, res) {
  return res.send('auth')
}

module.exports.login = function(req, res) {
  res.cookie('login-from-server', 'maximusnikulin', {
    maxAge: 90000
  })
  return res.render('login');
}
