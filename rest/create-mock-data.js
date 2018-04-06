const { models, sequelize } = require('./models');

function createData () {  
  let usersPromise = models.User.bulkCreate([
    {
      name: 'Bruce Wayne',
      login: 'Batman',
      password: 'securegotham',
      age: 45      
    },
    {
      name: 'Piter Parker',
      login: 'Spiderman',
      password: 'securenewyork',
      age: 25
    }    
  ]);

  let messagesPromise = models.Message.bulkCreate([
    {
      text: 'I\'m in cave'
    },
    {
      text: 'I\'m on home'
    },
    {
      text: 'Jocker\s here !!!'
    },
  ]);
  
  let roomsPromise = models.Room.bulkCreate([
    {
      title: 'Gotham city room'
    },
    {
      title: 'NYC room'
    }
  ]);

  Promise.all([usersPromise, messagesPromise, roomsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Message.findAll(),
      models.Room.findAll()
    ]))
    .then(([users, messages, rooms]) => {
      let promises = [];
      // Batman messages
      promises.push(messages[0].setUser(users[0]));
      promises.push(messages[2].setUser(users[0]));
      // Spiderman messages
      promises.push(messages[1].setUser(users[1]));
      // Gotham room      
      promises.push(messages[0].setRoom(rooms[0]));      
      promises.push(messages[1].setRoom(rooms[0]));
      // NYC room
      promises.push(messages[2].setRoom(rooms[1]));
      //Batman to Gotham room
      promises.push(users[0].addRooms(rooms[0]));
      //Spiderman to NYC room
      promises.push(users[1].addRooms(rooms[1]));

      return Promise.all(promises);
    })
    .then(() => console.log('Success created !!!'))      
}

sequelize.sync()
  .then(createData);
