import { CasesMap } from '../useCases';

const useCasesList = [...CasesMap.values()].map(({ name, path }) => ({ name, href: `/use-cases${path}` }));

export default async (req, res) => {
  res.render('pages/index', { useCasesList });
};
