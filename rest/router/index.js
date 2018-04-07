const express = require('express');
const passport = require('passport');

const { withAuth } = require('../middlewares/index');
const { 
  index, 
  private, 
  login, 
  logout, 
  passportLocalAuth,
  passportGoogleAuth,
  passportGoogleCallback,
  users,
  userInfo
} = require('./controllers');


const router = express.Router();

router.get('/', withAuth, index);
router.get('/login', login);
router.get('/logout', logout);

//service routes
router.post('/auth', passportLocalAuth);
router.get('/auth/google', passportGoogleAuth);
router.get('/auth/google/callback', passportGoogleCallback, function(req, res) {
  console.log('callback from google');
  res.redirect('/');
});

//rest
router.get('/users', users);
router.get('/users/:id', userInfo);

module.exports = router;
