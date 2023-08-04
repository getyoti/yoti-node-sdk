const useCasesList = require('../useCasesList');

module.exports = async (req, res) => {
  res.render('pages/index', { useCasesList });
};
