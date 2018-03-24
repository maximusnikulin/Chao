const express = require('express');
const { index, private, login, auth } = require('./controllers');
const { authLocal } = require('../middlewares');

const router = express.Router();

router.get('/', index);
router.get('/login', login);
router.get('/private', authLocal, private);

router.post('/auth', auth);

module.exports = router;
