const path = require('path');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const { twig } = require('twig');
const cookieParser = require('cookie-parser');

const { port, passport } = require('./config');
const { withSessions, withLocals } = require('./middlewares/index');
const router = require('./router');


const app = express();

app.set('view engine', 'twig');
app.enable('trust proxy')
app.use(withLocals);
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(withSessions);
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router)

app.get('/rest/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send(req.headers['user-agent']);
})
app.listen(port, () => console.log(`Express app listening on localhost:${port}`));

