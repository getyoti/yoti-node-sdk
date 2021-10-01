const indexController = require('./index.controller');
const successController = require('./success.controller');
const mediaController = require('./media.controller');
const errorController = require('./error.controller');
const pdfController = require("./pdf.controller");

module.exports = {
  indexController,
  successController,
  mediaController,
  errorController,
	pdfController,
};
