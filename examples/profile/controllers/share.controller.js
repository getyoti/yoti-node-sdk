const express = require('express');
const Yoti = require('yoti');
const config = require('../config');

const yotiClient = new Yoti.Client(config.CLIENT_SDK_ID, config.PEM_KEY);

const router = express.Router();

router.get('/createSession', (req, res) => {
  const dynamicPolicy = new Yoti.DynamicPolicyBuilder()
    .withFullName()
    .build();

  const notificationConfig = new Yoti.ShareNotificationBuilder()
    .withUrl('https://localhost:9443')
    .withHeader('Auth', 'hi')
    .withMethod('GET')
    .build();

  const sessionConfig = new Yoti.ShareSessionBuilder()
    .withPolicy(dynamicPolicy)
    .withRedirectUri('https://lala.co/gogo')
    .withNotification(notificationConfig)
    .withSubject({ subject_id: 'hello' })
    .build();

  yotiClient.createShareSession(sessionConfig)
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

router.post('/fetchReceipt', (req, res) => {
  const { receiptId } = req.body;

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

router.post('/fetchAndDecryptReceipt', (req, res) => {
  const { receiptId } = req.body;

  yotiClient.fetchAndDecryptReceipt(receiptId);
  res.status(200).send();
});

module.exports = router;
