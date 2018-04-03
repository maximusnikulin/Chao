const express = require('express');
const passport = require('passport');
const { index, private, login } = require('./controllers');
const { withAuth } = require('../middlewares/index');

const router = express.Router();

router.get('/', index);
router.get('/login', login);
router.get('/private', withAuth, private);

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
