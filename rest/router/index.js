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
  passportGoogleCallback 
} = require('./controllers');


const router = express.Router();

router.get('/', index);
router.get('/login', login);
router.get('/logout', logout);
router.get('/private', withAuth, private);

//service routes
router.post('/auth', passportLocalAuth);
router.get('/auth/google', passportGoogleAuth);
router.get('/auth/google/callback', passportGoogleCallback, function(req, res) {
  console.log('callback from google');
  res.redirect('/');
});

module.exports = router;
