require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));
app.use(session({
  secret: 'some-secret',
  resave: false,
  saveUninitialized: true,
}));

const router = express.Router();

router.get('/', require('./src/controllers/index.controller'));
router.get('/success', require('./src/controllers/success.controller'));
router.get('/media', require('./src/controllers/media.controller'));

app.use('/', router);

app.listen(port);

console.log(`Server running on https://localhost:${port}`);
