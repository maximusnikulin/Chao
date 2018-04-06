const LocalStrategy = require('passport-local').Strategy;

const { models: { User } } = require('../../models/index');


const strategy = new LocalStrategy({
    usernameField: 'login',
    password: 'password',
    passReqToCallback: true
  },
  function(req, login, password, done) {         
    return User.findOne({ 
      where: {
        login: login        
      } 
    })
    .then(function(user) {          
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      };     

      if (!(user.isValidPassword(password))) {
        console.log('is not valid');
        return done(null, false, { message: 'Incorrect password.' })
      };                     
            
      return done(null, user);
    })    
    .catch(function(err) {
      return done(err);
    });
  }
);

module.exports = strategy;