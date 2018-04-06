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
  ])
 
  Promise.all([usersPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Message.findAll()
    ]))
    .then(([users, messages]) => {
      let promises = [];

      promises.push(messages[0].setUser(users[0]));
      promises.push(messages[2].setUser(users[0]));
      promises.push(messages[1].setUser(users[1]));

      return Promise.all(promises);
    })
    .then(() => console.log('Success created !!!'))    
    
}

sequelize.sync()
  .then(createData);
