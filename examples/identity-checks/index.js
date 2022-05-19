require('dotenv').config();

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const indexController = require('./controllers/index.controller');
const shareUrlController = require('./controllers/share.url.controller');
const identityProfileReportController = require('./controllers/report.controller');

const app = express();
const port = process.env.PORT || 9445;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const router = express.Router();

router.get('/', indexController);
router.get('/identity-checks', indexController);
router.get('/get-new-share-url', shareUrlController);
router.get('/identity-profile-report', identityProfileReportController);

app.use('/', router);

// START THE SERVER
// =============================================================================
https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'server-cert.pem')),
}, app).listen(port);

console.log(`Server running on https://localhost:${port}`);
