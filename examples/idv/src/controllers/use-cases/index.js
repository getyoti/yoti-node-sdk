const authenticityAndIdentityCheckController = require('./authenticity.and.identity.check.controller');
const documentComparisonCheckController = require('./document.comparison.check.controller');
const allowNonLatinDocumentCheckController = require('./allow.non.latin.document.check.controller');
const allowExpiredDocumentCheckController = require('./allow.expired.document.check.controller');
const faceComparisonCheckController = require('./face.comparison.check.controller');
const faceMatchCheckController = require('./face.match.check.controller');
const watchlistCheckController = require('./watchlist.check.controller');

module.exports = {
  authenticityAndIdentityCheckController,
  documentComparisonCheckController,
  allowNonLatinDocumentCheckController,
  allowExpiredDocumentCheckController,
  faceComparisonCheckController,
  faceMatchCheckController,
  watchlistCheckController,
};
