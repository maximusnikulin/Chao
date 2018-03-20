const Sequelize = require('sequelize');

module.exports = function (sequelize) {  
  const User = sequelize.define('User', {   
    login: Sequelize.STRING,
    password: Sequelize.STRING,
    name: Sequelize.STRING
  }, {
    timestamps: false,
  });

  const Room = sequelize.define('Room', {
    title: Sequelize.STRING           
  },
  {
    timestamps: false,
  });

  const Message = sequelize.define('Message', {
    text: Sequelize.STRING
  },
  {
    timestamps: false,
  })  

  Message.belongsTo(User, {
    // foreignKey: 'authorId',
    // as: 'Author'
  });

  User.hasMany(Message, {
    // as: 'Messages'
  })

  return {
    Room, User, Message
  };
};
