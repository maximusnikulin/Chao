const passport = require('passport');
const strategies = require('../config/strategies');

module.exports.authLocal = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/'
});