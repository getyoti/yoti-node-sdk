const Cases = {
  DOCUMENT_AUTHENTICITY_AND_IDENTITY: 'documentAuthenticityAndIdentity',
  DOCUMENT_COMPARISON: 'documentComparison',
  AllOW_NON_LATIN_DOCUMENT: 'allowNonLatinDocument',
  AllOW_EXPIRED_DOCUMENT: 'allowExpiredDocument',
  FACE_COMPARISON: 'faceComparison',
  FACE_MATCH: 'faceMatch',
  WATCHLIST: 'watchlist',
  SUPPRESSED_SCREENS: 'suppressedScreens',
  WITH_DID_DOCUMENTS: 'withDigitalIdDocuments',
};

const CasesMap = new Map([
  [Cases.DOCUMENT_AUTHENTICITY_AND_IDENTITY, {
    name: 'Document authenticity and Identity check',
    path: '/document-authenticity-and-identity-check',
  }],
  [Cases.DOCUMENT_COMPARISON, {
    name: 'Document comparison check',
    path: '/document-comparison-check',
  }],
  [Cases.AllOW_NON_LATIN_DOCUMENT, {
    name: 'Allow non Latin document',
    path: '/allow-non-latin-document',
  }],
  [Cases.AllOW_EXPIRED_DOCUMENT, {
    name: 'Allow expired document',
    path: '/allow-expired-document',
  }],
  [Cases.FACE_COMPARISON, {
    name: 'Face comparison check',
    path: '/face-comparison-check',
  }],
  [Cases.FACE_MATCH, {
    name: 'Face match check',
    path: '/face-match-check',
  }],
  [Cases.WATCHLIST, {
    name: 'Watchlist check',
    path: '/watchlist-check',
  }],
  [Cases.SUPPRESSED_SCREENS, {
    name: 'Suppressed screens check',
    path: '/suppressed-screens-check',
  }],
  [Cases.WITH_DID_DOCUMENTS, {
    name: 'Accept Digital ID',
    path: '/with-accepted-digital-id',
  }],
]);

module.exports = {
  Cases,
  CasesMap,
};
