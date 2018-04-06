const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { models: { User } } = require('../../models/index');


const clientId = '188300570162-1isk1hhhk3e56flodjf7b5315i0i58ld.apps.googleusercontent.com';
const secretId = 'FoELKBfRphfUOI9f3uB74-AQ';

const strategy = new GoogleStrategy({
  clientID: clientId,
  clientSecret: secretId,
  callbackURL: "http://127.0.0.1:8000/auth/google/callback" 
}, 
function(accessToken, refreshToken, profile, done) {    
  User.findOrCreate({
    where: {
      googleId: profile.id
    },
    defaults: {
      name: profile.displayName,          
      login: profile.emails[0].value
    }
  })    
  .spread(function(user, created) {        
    done(null, user);
  })
  .catch(function(err) {
    done(err);
  })
});

module.exports = strategy;
