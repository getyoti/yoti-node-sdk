const express = require('express');
const Yoti = require('yoti');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

const router = express.Router();

router.get('/createSession', (req, res) => {
  const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withFullName()
    .build();

  const dynamicScenario = new Yoti.DynamicScenarioBuilder()
    .withCallbackEndpoint('/profile')
    .withPolicy(dynamicPolicy)
    .build();

  yotiClient.createShareSession(dynamicScenario)
    .then((shareSessionResult) => yotiClient.createShareQrCode(shareSessionResult.getId())
      .then((shareQrCodeResult) => {
        res.status(200).json({ session: shareSessionResult, qrCode: shareQrCodeResult });
      }))
    .catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });
});

router.get('/fetchSession/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  yotiClient.fetchShareSession(sessionId)
    .then((ShareReceiptResult) => {
      res.status(200).json(ShareReceiptResult);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });
});

router.get('/fetchReceipt/:receiptId', (req, res) => {
  const { receiptId } = req.params;

  yotiClient.fetchReceiptById(receiptId)
    .then((fetchShareSessionResult) => {
      res.status(200).json(fetchShareSessionResult);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });
});

router.get('/fetchReceiptItemKey/:id', (req, res) => {
  const { id } = req.params;

  yotiClient.fetchReceiptItemKey(id)
    .then((fetchShareSessionResult) => {
      res.status(200).json(fetchShareSessionResult);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });
});

router.get('/fetchQrCode/:qrCodeId', (req, res) => {
  const { qrCodeId } = req.params;

  yotiClient.fetchQrCode(qrCodeId)
    .then((fetchShareSessionResult) => {
      res.status(200).json(fetchShareSessionResult);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });
});

router.get('/fetchReceipts/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  yotiClient.fetchReceiptsBySessionId(sessionId)
    .then((fetchReceiptsResult) => {
      res.status(200).json(fetchReceiptsResult);
    })
    .catch((error) => {
      console.error(error.message);
      res.status(400).json(error);
    });

});

module.exports = router;
