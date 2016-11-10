'use strict'

const fs = require('fs');

const CONFIG_FILE = process.env.CONFIG_FILE || `${__dirname}/config.json`;
let configuration = require(CONFIG_FILE);


exports.configuration = configuration