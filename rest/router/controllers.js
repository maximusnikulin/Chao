const passport = require('passport');

const { models: { Room, User, UserRoom }, sequelize } = require('../models');
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

module.exports.roomInfo = async function(req, res) {
  const room = await Room.find({
    where: {
      id: req.params.id
    },    
    include: [
      {
        model: User,
        attributes: {
          exclude: ['password']
        },
        through: {
          attributes: []
        }
      }
    ]
  })  

  res.json(room);
}

module.exports.roomCreateGet = function(req, res) {       
  res.render('createRoom');  
}

module.exports.roomCreatePost = async function(req, res) {
  const room = await Room.create({
    title: req.body.title,    
  });

  const roomUser = await UserRoom.create({
    RoomId: room.id,
    UserId: req.user.id
  })
  res.redirect('/rooms/' + room.id)
}
