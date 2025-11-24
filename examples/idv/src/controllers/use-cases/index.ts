import authenticityAndIdentityCheckController = require('./authenticity.and.identity.check.controller');
import documentComparisonCheckController = require('./document.comparison.check.controller');
import allowNonLatinDocumentCheckController = require('./allow.non.latin.document.check.controller');
import allowExpiredDocumentCheckController = require('./allow.expired.document.check.controller');
import faceComparisonCheckController = require('./face.comparison.check.controller');
import faceMatchCheckController = require('./face.match.check.controller');
import watchlistCheckController = require('./watchlist.check.controller');
import suppressedScreensCheckController = require('./suppressed.screens.check.controller');

export {
  authenticityAndIdentityCheckController,
  documentComparisonCheckController,
  allowNonLatinDocumentCheckController,
  allowExpiredDocumentCheckController,
  faceComparisonCheckController,
  faceMatchCheckController,
  watchlistCheckController,
  suppressedScreensCheckController,
};
