var passport = require('passport')
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
    usernameField: 'login',
    password: 'password'
  },
  function(login, password, done) {       
    User.findOne({ 
      where: {
        login: login
      } 
    }, 
      function (err, user) {
        if (err) { 
          return done(err); 
        };

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        };
        
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        };

        return done(null, user);
    });
  }
));