require('dotenv').config();

const express = require('express');
const controllers = require('../controllers');
const { Cases, CasesMap } = require('../useCases');

const router = express.Router();

const {
  authenticityAndIdentityCheckController,
  documentComparisonCheckController,
  faceComparisonCheckController,
  faceMatchCheckController,
  watchlistCheckController,
} = controllers.useCasesControllers;

const caseIdToControllerMapping = {
  [Cases.DOCUMENT_AUTHENTICITY_AND_IDENTITY]: authenticityAndIdentityCheckController,
  [Cases.DOCUMENT_COMPARISON]: documentComparisonCheckController,
  [Cases.FACE_COMPARISON]: faceComparisonCheckController,
  [Cases.FACE_MATCH]: faceMatchCheckController,
  [Cases.WATCHLIST]: watchlistCheckController,
};

const casesEntries = [...CasesMap.entries()];

casesEntries.forEach(([caseId, caseDescription]) => {
  const { name, path } = caseDescription;
  const controller = caseIdToControllerMapping[caseId];
  if (controller) {
    router.get(path, controller);
  } else {
    console.warn(`No supported case "${caseId}": ${name}.`);
  }
});

router.use((req, res) => res.send('Unknown use case!'));

module.exports = router;
