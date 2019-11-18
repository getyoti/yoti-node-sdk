require('dotenv').config();

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const indexController = require('./controllers/index.controller');
const profileController = require('./controllers/profile.controller');
const dynamicShareController = require('./controllers/dynamic.share.controller');

const app = express();
const port = process.env.PORT || 9443;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const router = express.Router();

router.get('/', indexController);
router.get('/dynamic-share', dynamicShareController);
router.get('/profile', profileController);

app.use('/', router);

// START THE SERVER
// =============================================================================
https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'server-cert.pem')),
}, app).listen(port);

console.log(`Server running on https://localhost:${port}`);
