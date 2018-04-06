const Sequelize = require('sequelize');

const scheme = require('./scheme');


const sequelize = new Sequelize(null, null, null, {  
    dialect: 'sqlite',
    storage: './test.db',  
    logging: false  
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

scheme(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;
