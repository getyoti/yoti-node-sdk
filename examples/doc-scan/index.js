require('dotenv').config();

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const indexController = require('./controllers/index.controller');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/static', express.static('static'));

const router = express.Router();

router.get('/', indexController);
app.use('/', router);

http.createServer({}, app).listen(port);

console.log(`Server running on https://localhost:${port}`);
