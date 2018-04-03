var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var { models: { User } } = require('../models/index');

passport.use(new LocalStrategy(
  {
    usernameField: 'login',
    password: 'password'
  },
  function(login, password, done) {         
    return User.findOne({ 
      where: {
        login: login        
      } 
    })
    .then(function(user) {          
      if (!user) {
        return done(null, false, {message: 'Incorrect username.'});
      }      

      if (!(user.isValidPassword(password))) {
        console.log('is not valid');
        return done(null, false, { message: 'Incorrect password.' })
      }

      return done(null, user);
    })    
    .catch(function(err) {
      return done(err);
    })
  }
));

passport.serializeUser(function(user, done) {  
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).then(function(user) {
    done(null, user);
  })    
});