const path = require('path');
const express = require('express');
const router = require('./router');
const { port, passport } = require('./config');
const bodyParser = require('body-parser');
const twig = require('twig').twig;
const cookieParser = require('cookie-parser');
const { withSessions, withLocals } = require('./middlewares/index');

const app = express();


app.set('view engine', 'twig');
app.enable('trust proxy')
app.use(withLocals);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(withSessions);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router)

app.listen(port, () => console.log(`Express app listening on localhost:${port}`));

