'use strict';

const config = require('../../config');
const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');

const DynamicScenario = require('./dynamic.scenario');
const DynamicScenarioBuilder = require('./dynamic.scenario.builder');
const DynamicPolicyBuilder = require('./policy/dynamic.policy.builder');
const WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
const ExtensionBuilder = require('./extension/extension.builder');
const LocationConstraintExtensionBuilder = require('./extension/location.constraint.extension.builder');
const TransactionalFlowExtensionBuilder = require('./extension/transactional.flow.extension.builder');
const ThirdPartyAttributeExtensionBuilder = require('./extension/third.party.attribute.extension.builder');
const WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
const ConstraintsBuilder = require('./policy/constraints.builder');
const SourceConstraintBuilder = require('./policy/source.constraint.builder');

const ShareSessionResult = require('./share.session.result');
const ShareQrCodeResult = require('./share.qr.code.result');
const ShareSessionFetchResult = require('./share.session.fetch.result');
const Validation = require('../yoti_common/validation');
const ShareReceiptResult = require('./share.receipt.result');
const ShareReceiptItemKeyResult = require('./share.receipt.item.key.result');
const ShareQrCodeFetchResult = require('./share.qr.code.fetch.result');
const ShareReceiptsResult = require('./share.receipts.result');

const ShareSessionBuilder = require('./share.session.builder');
const ShareNotificationBuilder = require('./share.notification.builder');

const DEFAULT_API_URL = config.yoti.connectApi;

/**
 * Service Class to handle interactions with the dynamic share API
 *
 * @class DynamicShareService
 */
class ShareService {
  /**
   * @param {string} sdkId
   * @param {string|Buffer} pem
   * @param {Object} options
   * @param {string} options.apiUrl
   */
  constructor(sdkId, pem, { apiUrl = DEFAULT_API_URL } = {}) {
    Validation.isString(sdkId, 'sdkId');
    Validation.notNullOrEmpty(pem, 'pem');

    this.sdkId = sdkId;
    this.pem = pem;
    this.apiUrl = apiUrl;
  }

  /**
   *
   * @param ShareSession
   * @returns {Promise<ShareSessionResult>}
   */
  createSession(ShareSession) {
    console.log('⚡️>>>> create Session Time!');
    const jsonShareSession = JSON.parse(JSON.stringify(ShareSession));

    const payload = new Payload(jsonShareSession);

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint('/v2/sessions')
      .withQueryParam('appId', this.sdkId)
      .withMethod('POST')
      .withPayload(payload);

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareSessionResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }

  createQrCode(sessionId) {
    console.log('⚡️>>>> create QR Time!');
    const payload = new Payload({});
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/sessions/${sessionId}/qr-codes`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('POST')
      .withPayload(payload);

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareQrCodeResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }

  fetchSession(sessionId) {
    console.log('⚡️>>>> fetch session Time!');
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/sessions/${sessionId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareSessionFetchResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }

  fetchReceiptById(receiptId) {
    console.log('⚡️>>>> fetch Receipt by id Time!');
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/receipts/${receiptId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareReceiptResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }

  fetchReceiptItemKey(id) {
    console.log('⚡️>>>> fetch Receipt Item Key Time!');
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/wrapped-item-keys/${id}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareReceiptItemKeyResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }

  fetchQrCode(qrCodeId) {
    console.log('⚡️>>>> fetch QR Code Time!');
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/qr-codes/${qrCodeId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareQrCodeFetchResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }

  fetchReceiptsBySessionId(sessionId) {
    console.log('⚡️>>>> fetch receipts by sessionId Time!');
    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint('/v2/receipts')
      .withQueryParam('appId', this.sdkId)
      .withQueryParam('sessionId', sessionId)
      .withMethod('GET');

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareReceiptsResult(parsedResponse));
          } catch (err) {
            console.log(`Error getting response data: ${err}`);
            return reject(err);
          }
        })
        .catch((err) => {
          console.log(`Error retrieving requested data: ${err}`);
          return reject(err);
        });
    });
  }
}

/**
 * Requests a share URL for provided Dynamic Scenario.
 *
 * @param {DynamicScenario} dynamicScenario
 * @param {string} pem
 * @param {string} sdkId
 *
 * @returns {Promise} containing a ShareUrlResult
 */
const createSession = (dynamicScenario, pem, sdkId) => {
  const dynamicShareService = new ShareService(sdkId, pem);
  return dynamicShareService.createSession();
};

module.exports = {
  createSession,
  ShareService,
  ShareSessionBuilder,
  ShareNotificationBuilder,
  // DynamicScenarioBuilder,
  // DynamicPolicyBuilder,
  // WantedAttributeBuilder,
  // ExtensionBuilder,
  // LocationConstraintExtensionBuilder,
  // TransactionalFlowExtensionBuilder,
  // ThirdPartyAttributeExtensionBuilder,
  // WantedAnchorBuilder,
  // ConstraintsBuilder,
  // SourceConstraintBuilder,
};
