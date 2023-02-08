'use strict';

const config = require('../../config');
const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');

// const DynamicScenario = require('./dynamic.scenario');
// const DynamicScenarioBuilder = require('./dynamic.scenario.builder');
// const DynamicPolicyBuilder = require('./policy/dynamic.policy.builder');
// const WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
// const ExtensionBuilder = require('./extension/extension.builder');
// const LocationConstraintExtensionBuilder
// = require('./extension/location.constraint.extension.builder');
// const TransactionalFlowExtensionBuilder
// = require('./extension/transactional.flow.extension.builder');
// const ThirdPartyAttributeExtensionBuilder
// = require('./extension/third.party.attribute.extension.builder');
// const WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
// const ConstraintsBuilder = require('./policy/constraints.builder');
// const SourceConstraintBuilder = require('./policy/source.constraint.builder');

const ShareSessionResult = require('./share.session.result');
const ShareQrCodeResult = require('./share.qr.code.result');
const ShareSessionFetchResult = require('./share.session.fetch.result');
const Validation = require('../yoti_common/validation');
const ShareReceiptResult = require('./share.receipt.result');
const ShareReceipt = require('./share.receipt');
const ShareReceiptItemKeyResult = require('./share.receipt.item.key.result');
const ShareQrCodeFetchResult = require('./share.qr.code.fetch.result');
const ShareReceiptsResult = require('./share.receipts.result');

const ShareSessionBuilder = require('./share.session.builder');
const ShareNotificationBuilder = require('./share.notification.builder');

const { decryptReceiptKey, unwrapKey, decryptEncryptedDataNew } = require('../yoti_common');
const { AttributeListConverter } = require('../yoti_common/converters/attribute.list.converter');

const { AttributeList } = require('../proto/types');

const DEFAULT_API_URL = config.yoti.connectApi;

/**
 * Service Class to handle interactions with the Share v2 API
 *
 * @class ShareService
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
   * @param shareSessionConfig
   * @returns {Promise<ShareSessionResult>}
   */
  createSession(shareSessionConfig) {
    console.log('⚡️>>>> create Session Time!');
    const jsonShareSession = JSON.parse(JSON.stringify(shareSessionConfig));

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

  /**
   *
   * @param sessionId
   * @returns {Promise<ShareQrCodeResult>}
   */
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

  /**
   *
   * @param sessionId
   * @returns {Promise<ShareSessionFetchResult>}
   */
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

  /**
   *
   * @param receiptId
   * @returns {Promise<ShareReceiptResult>}
   */
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

  /**
   *
   * @param id
   * @returns {Promise<ShareReceiptItemKeyResult>}
   */
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

  /**
   *
   * @param qrCodeId
   * @returns {Promise<ShareQrCodeFetchResult>}
   */
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

  /**
   *
   * @param sessionId
   * @returns {Promise<ShareReceiptsResult>}
   */
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

  async fetchAndDecryptReceipt(receiptId) {
    const receiptIdUrl = Buffer.from(receiptId, 'base64').toString('base64url');

    try {
      const response = await this.fetchReceiptById(receiptIdUrl);
      const receiptItemKey = await this.fetchReceiptItemKey(response.getWrappedItemKeyId());

      const encryptedItemKey = receiptItemKey.getValue();
      const decryptedItemKey = unwrapKey(encryptedItemKey, this.pem);

      const decryptionMaterial = {
        kek: Buffer.from(decryptedItemKey, 'binary').toString('base64'),
        iv: receiptItemKey.getIv(),
      };

      const decryptedWrappedKey = decryptReceiptKey(response.getWrappedKey(), decryptionMaterial);

      const otherPartyContent = response.getOtherPartyContent();
      const decryptedUserProfile = decryptEncryptedDataNew(
        otherPartyContent.profile,
        decryptedWrappedKey
      );
      const decodedUserProfile = AttributeList.decode(decryptedUserProfile);
      const convertedUserProfile = AttributeListConverter.convertAttributeList(
        decodedUserProfile.attributes
      );
      const userProfile = {
        attributes: convertedUserProfile,
      };

      const content = response.getContent();
      const decryptedApplicationProfile = decryptEncryptedDataNew(
        content.profile,
        decryptedWrappedKey
      );
      const decodedApplicationProfile = AttributeList.decode(decryptedApplicationProfile);
      const convertedApplicationProfile = AttributeListConverter.convertAttributeList(
        decodedApplicationProfile.attributes
      );
      const applicationProfile = {
        attributes: convertedApplicationProfile,
      };

      return new ShareReceipt(response, userProfile, applicationProfile);
    } catch (err) {
      console.log(`Error getting response data: ${err}`);
      return err;
    }
  }
}

/**
 * Requests a share session to be created with given config.
 *
 * @param {ShareSession} shareSessionConfig
 * @param {string} pem
 * @param {string} sdkId
 *
 * @returns {Promise} containing a ShareSessionResult
 */
const createSession = (shareSessionConfig, pem, sdkId) => {
  const shareService = new ShareService(sdkId, pem);
  return shareService.createSession(shareSessionConfig);
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
