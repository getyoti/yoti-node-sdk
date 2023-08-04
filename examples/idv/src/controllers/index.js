const indexController = require('./index.controller');
const useCasesControllers = require('./use-cases');
const successController = require('./success.controller');
const configController = require('./config.controller');
const mediaController = require('./media.controller');
const errorController = require('./error.controller');

module.exports = {
  indexController,
  useCasesControllers,
  successController,
  configController,
  mediaController,
  errorController,
};
