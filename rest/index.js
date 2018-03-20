const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const pagesRoutes = require('./pages/routes');
const twig = require('twig').twig;
const config = require('./config');

const app = express();

app.set('view engine', 'twig');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/', pagesRoutes)

app.listen(config.port, () => console.log(`Express app listening on localhost:${config.port}`));
