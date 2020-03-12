require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const controllers = require('./src/controllers');

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

router.get('/', controllers.indexController);
router.get('/success', controllers.successController);
router.get('/media', controllers.mediaController);

app.use('/', router);

app.listen(port);

console.log(`Server running on https://localhost:${port}`);
