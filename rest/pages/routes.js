const express = require('express');
const { index, users, messages } = require('./controllers');

const router = express.Router();

router.get('/', index);
router.get('/users', users);
router.get('/messages', messages);

module.exports = router;
