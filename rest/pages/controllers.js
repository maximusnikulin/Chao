const { models, sequelize } = require('../models');


module.exports.index = function(req, res) {  
  return res.render('index', {foo: 'bar'});
};

module.exports.users = function(req, res) {
  return models.User.findAll({
    include: [
      models.Message
    ]
  }).then(users => {    
    return res.json(users);
  });  
}

module.exports.messages = function(req, res) {
  return models.Message.findAll({
    include: [
      models.User
    ]
  }).then(messages => {
    return res.json(messages);
  });
}

