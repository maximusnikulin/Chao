var passport = require('passport');

var localStrategy = require('./local');
var googelStrategy = require('./google');
var { models: { User } } = require('../../models/index');


passport.use(localStrategy);
passport.use(googelStrategy);

passport.serializeUser(function(req, user, done) {  
  req.session.ip = req.ip;        
  done(null, user.id);
});

passport.deserializeUser(function(req, userId, done) {     
  User.findById(userId).then(function(user) {    
    done(null, user);
  });    
});

module.exports = passport;