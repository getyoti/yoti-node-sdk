require('dotenv').config();

const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const routes = require('./src/routes');

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

app.use('/', routes);

https.createServer({
  key: fs.readFileSync(path.join(__dirname, '../keys', 'server-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, '../keys', 'server-cert.pem')),
}, app).listen(port);

console.log(`Server running on https://localhost:${port}`);
