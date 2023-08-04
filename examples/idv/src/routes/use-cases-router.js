require('dotenv').config();

const express = require('express');
const controllers = require('../controllers');

const router = express.Router();

const {
  authenticityAndIdentityCheckController,
  documentComparisonCheckController,
  faceComparisonCheckController,
  faceMatchCheckController,
  watchlistCheckController,
} = controllers.useCasesControllers;

router.get('/document-authenticity-and-identity-check', authenticityAndIdentityCheckController);
router.get('/document-comparison-check', documentComparisonCheckController);
router.get('/face-comparison-check', faceComparisonCheckController);
router.get('/face-match-check', faceMatchCheckController);
router.get('/watchlist-check', watchlistCheckController);

router.use((req, res) => res.send('Unknown use case!'));

module.exports = router;
