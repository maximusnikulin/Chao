const passport = require('./passport');

module.exports = {
  port: 8000,
  passport: passport,
  locals: {
    title: 'ChaoChat'
  }
}
