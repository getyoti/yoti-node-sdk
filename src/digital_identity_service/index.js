'use strict';

const config = require('../../config');
const Validation = require('../yoti_common/validation');

const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');

const ReceiptResponse = require('./receipts/receipt.response');
const ReceiptItemKeyResponse = require('./receipts/receipt.item.key.response');
const { unwrapReceiptKey } = require('./receipts/decryption.utils');

const CreateShareSessionResult = require('./create.share.session.result');
const GetShareSessionResult = require('./get.share.session.result');
const CreateShareQrCodeResult = require('./create.share.qr.code.result');
const GetShareQrCodeResult = require('./get.share.qr.code.result');
const GetShareReceiptResult = require('./get.share.receipt.result');

const WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
const ConstraintsBuilder = require('./policy/constraints.builder');
const SourceConstraintBuilder = require('./policy/source.constraint.builder');
const WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
const PolicyBuilder = require('./policy/policy.builder');

const LocationConstraintExtensionBuilder = require('./extension/location.constraint.extension.builder');
const TransactionalFlowExtensionBuilder = require('./extension/transactional.flow.extension.builder');
const ThirdPartyAttributeExtensionBuilder = require('./extension/third.party.attribute.extension.builder');
const ExtensionBuilder = require('./extension/extension.builder');

const ShareSessionConfigurationBuilder = require('./share.session.configuration.builder');
const ShareSessionNotificationBuilder = require('./share.session.notification.builder');
const ShareSessionConfiguration = require('./share.session.configuration');
const DigitalIdentityServiceError = require('./digital.identity.service.error');
const { buildApplicationContentFromEncryptedContent, buildUserContentFromEncryptedContent } = require('./receipts/content.factory');

const DEFAULT_API_URL = config.yoti.digitalIdentityApi;

/**
 * Defines the Digital Identity Service.
 *
 * @class DigitalIdentityService
 */
class DigitalIdentityService {
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
   * @returns {Promise<CreateShareSessionResult>}
   */
  async createShareSession(shareSessionConfig) {
    Validation.instanceOf(shareSessionConfig, ShareSessionConfiguration, 'shareSessionConfig');

    const payload = new Payload(shareSessionConfig);

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint('/v2/sessions')
      .withQueryParam('appId', this.sdkId)
      .withMethod('POST')
      .withPayload(payload);

    const request = requestBuilder.build();

    let response;

    try {
      response = await request.execute();
    } catch (error) {
      console.log(`Error retrieving requested data: ${error}`);
      throw new DigitalIdentityServiceError(error);
    }

    try {
      const parsedResponse = response.getParsedResponse();

      return new CreateShareSessionResult(parsedResponse);
    } catch (err) {
      console.log(`Error getting response data: ${err}`);

      throw err;
    }
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<GetShareSessionResult>}
   */
  async getShareSession(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/sessions/${sessionId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    const request = requestBuilder.build();

    let response;

    try {
      response = await request.execute();
    } catch (error) {
      console.log(`Error retrieving requested data: ${error}`);

      throw new DigitalIdentityServiceError(error);
    }

    try {
      const parsedResponse = response.getParsedResponse();

      return new GetShareSessionResult(parsedResponse);
    } catch (err) {
      console.log(`Error getting response data: ${err}`);

      throw err;
    }
  }

  /**
   *
   * @param sessionId
   * @returns {Promise<CreateShareQrCodeResult>}
   */
  async createShareQrCode(sessionId) {
    Validation.isString(sessionId, 'sessionId');

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

    let response;

    try {
      response = await request.execute();
    } catch (error) {
      console.log(`Error retrieving requested data: ${error}`);
      throw new DigitalIdentityServiceError(error);
    }

    try {
      const parsedResponse = response.getParsedResponse();

      return new CreateShareQrCodeResult(parsedResponse);
    } catch (err) {
      console.log(`Error getting response data: ${err}`);

      throw err;
    }
  }

  /**
   *
   * @param qrCodeId
   * @returns {Promise<GetShareQrCodeResult>}
   */
  async getShareQrCode(qrCodeId) {
    Validation.isString(qrCodeId, 'qrCodeId');

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/qr-codes/${qrCodeId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET');

    const request = requestBuilder.build();

    let response;

    try {
      response = await request.execute();
    } catch (error) {
      console.log(`Error retrieving requested data: ${error}`);
      throw new DigitalIdentityServiceError(error);
    }

    try {
      const parsedResponse = response.getParsedResponse();

      return new GetShareQrCodeResult(parsedResponse);
    } catch (err) {
      console.log(`Error getting response data: ${err}`);

      throw err;
    }
  }

  /**
   *
   * @param {string} receiptId
   * @returns {Promise<ReceiptResponse>}
   */
  async fetchReceipt(receiptId) {
    const receiptIdUrl = Buffer.from(receiptId, 'base64').toString('base64url');

    const request = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/receipts/${receiptIdUrl}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET')
      .build();

    try {
      const response = await request.execute();
      const parsedResponse = response.getParsedResponse();

      return new ReceiptResponse(parsedResponse);
    } catch (error) {
      throw new DigitalIdentityServiceError(error);
    }
  }

  /**
   *
   * @param {string} receiptItemKeyId
   * @returns {Promise<ReceiptItemKeyResponse>}
   */
  async fetchReceiptItemKey(receiptItemKeyId) {
    const request = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem)
      .withEndpoint(`/v2/wrapped-item-keys/${receiptItemKeyId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('GET')
      .build();

    try {
      const response = await request.execute();
      const parsedResponse = response.getParsedResponse();

      return new ReceiptItemKeyResponse(parsedResponse);
    } catch (error) {
      throw new DigitalIdentityServiceError(error);
    }
  }

  /**
   *
   * @param {string} receiptId
   * @returns {Promise<GetShareReceiptResult>}
   */
  async getShareReceipt(receiptId) {
    const receiptResponse = await this.fetchReceipt(receiptId);

    const itemKeyId = receiptResponse.getWrappedItemKeyId();
    if (!itemKeyId) return new GetShareReceiptResult(receiptResponse);

    const encryptedItemKeyResponse = await this.fetchReceiptItemKey(itemKeyId);

    const receiptContentKey = unwrapReceiptKey(
      receiptResponse.getWrappedKey(),
      encryptedItemKeyResponse.getValue(),
      encryptedItemKeyResponse.getIv(),
      this.pem
    );
    const applicationContent = buildApplicationContentFromEncryptedContent(
      receiptResponse.getContent(),
      receiptContentKey
    );

    const userContent = buildUserContentFromEncryptedContent(
      receiptResponse.getOtherPartyContent(),
      receiptContentKey
    );

    return new GetShareReceiptResult(receiptResponse, userContent, applicationContent);
  }
}

module.exports = {
  DigitalIdentityService,
  DigitalIdentityBuilders: {
    LocationConstraintExtensionBuilder,
    TransactionalFlowExtensionBuilder,
    ThirdPartyAttributeExtensionBuilder,
    ExtensionBuilder,
    WantedAnchorBuilder,
    SourceConstraintBuilder,
    ConstraintsBuilder,
    WantedAttributeBuilder,
    PolicyBuilder,
    ShareSessionConfigurationBuilder,
    ShareSessionNotificationBuilder,
  },
};
