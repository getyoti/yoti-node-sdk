require('dotenv').config();

const express = require('express');

const controllers = require('../controllers');
const useCasesRouter = require('./use-cases-router');

const router = express.Router();

router.use('/use-cases', useCasesRouter);
router.get('/', controllers.indexController);
router.get('/success', controllers.successController);
router.get('/config', controllers.configController);
router.get('/media', controllers.mediaController);
router.get('/error', controllers.errorController);
router.get('/privacy-policy', async (req, res) => res.render('pages/privacy-policy'));

module.exports = router;
