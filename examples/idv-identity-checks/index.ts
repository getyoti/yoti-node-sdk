require('dotenv').config();

import express = require('express');
import https = require('https');
import fs = require('fs');
import path = require('path');
import bodyParser = require('body-parser');
import session = require('express-session');
import controllers = require('./src/controllers');

const app = express();
const port = process.env.PORT || 3003;

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
router.post('/session', controllers.sessionController);
router.get('/success', controllers.successController);
router.get('/media', controllers.mediaController);
router.get('/error', controllers.errorController);
router.get('/privacy-policy', async (req, res) => res.render('pages/privacy-policy'));

app.use('/', router);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'server-cert.pem')),
}, app).listen(port);

console.log(`Server running on https://localhost:${port}`);
