const { CasesMap } = require('../useCases');

const useCasesList = [...CasesMap.values()].map(({ name, path }) => ({ name, href: `/use-cases${path}` }));

module.exports = async (req, res) => {
  res.render('pages/index', { useCasesList });
};
