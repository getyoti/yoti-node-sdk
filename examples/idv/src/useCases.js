const Cases = {
  DOCUMENT_AUTHENTICITY_AND_IDENTITY: 'documentAuthenticityAndIdentity',
  DOCUMENT_COMPARISON: 'documentComparison',
  AllOW_EXPIRED_DOCUMENT: 'allowExpiredDocument',
  FACE_COMPARISON: 'faceComparison',
  FACE_MATCH: 'faceMatch',
  WATCHLIST: 'watchlist',
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
]);

module.exports = {
  Cases,
  CasesMap,
};
