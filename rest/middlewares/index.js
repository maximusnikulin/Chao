const session = require('express-session');
const FileStore = require('session-file-store')(session);

const { passport } = require('../config/index');
const { locals } = require('../config/index');


module.exports.withAuth = function (req, res, next) {
  const ipIsMatch = req.session.ip === req.ip;
  if (ipIsMatch && req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  };

  res.redirect('/login');
};

module.exports.withSessions = session({
  name: 'superhero-session-id',
  secret: 'Superheroes also have chat',
  store: new FileStore(),
  resave: true
});

module.exports.withLocals = function(req, res, next) {
  res.locals = locals;
  next();
};