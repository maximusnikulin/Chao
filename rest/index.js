const path = require('path');
const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const router = require('./router');
const twig = require('twig').twig;
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.set('view engine', 'twig');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'my-secret-key'
}));
app.use(passport.initialize());
app.use('/', router)

app.listen(config.port, () => console.log(`Express app listening on localhost:${config.port}`));
