const express = require('express');
const { index, private, login, auth } = require('./controllers');
const { authMiddleware } = require('../middlewares');

const router = express.Router();

router.get('/', index);
router.get('/login', login);
router.post('/auth', auth);
router.get('/private', authMiddleware, private);

module.exports = router;
