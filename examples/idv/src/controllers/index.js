const indexController = require('./index.controller');
const indexControllerWithFaceComparison = require('./index.controller.with.face.comparison');
const successController = require('./success.controller');
const configController = require('./config.controller');
const mediaController = require('./media.controller');
const errorController = require('./error.controller');

module.exports = {
  indexController,
  indexControllerWithFaceComparison,
  successController,
  configController,
  mediaController,
  errorController,
};
