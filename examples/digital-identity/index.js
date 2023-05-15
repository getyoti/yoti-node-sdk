require('dotenv').config();

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const shareController = require('./controllers/share.controller');
const shareSessionController = require('./controllers/share.session.controller');

const app = express();
const port = process.env.PORT || 9443;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const router = express.Router();

router.use('/', shareController);
router.use('/share', shareSessionController);

app.use('/', router);

// START THE SERVER
// =============================================================================
https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'server-cert.pem')),
}, app).listen(port);

console.log(`Server running on https://localhost:${port}`);
