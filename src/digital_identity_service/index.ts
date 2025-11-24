import config = require('../../config');
import Validation = require('../yoti_common/validation');

import { RequestBuilder } from '../request/request.builder';
import { Payload } from '../request/payload';

import ReceiptResponse = require('./receipts/receipt.response');
import ReceiptItemKeyResponse = require('./receipts/receipt.item.key.response');
import { unwrapReceiptKey } from './receipts/decryption.utils';

import CreateShareSessionResult = require('./create.share.session.result');
import GetShareSessionResult = require('./get.share.session.result');
import CreateShareQrCodeResult = require('./create.share.qr.code.result');
import GetShareQrCodeResult = require('./get.share.qr.code.result');
import GetShareReceiptResult = require('./get.share.receipt.result');

import WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
import ConstraintsBuilder = require('./policy/constraints.builder');
import SourceConstraintBuilder = require('./policy/source.constraint.builder');
import WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
import PolicyBuilder = require('./policy/policy.builder');

import LocationConstraintExtensionBuilder = require('./extension/location.constraint.extension.builder');
import TransactionalFlowExtensionBuilder = require('./extension/transactional.flow.extension.builder');
import ThirdPartyAttributeExtensionBuilder = require('./extension/third.party.attribute.extension.builder');
import ExtensionBuilder = require('./extension/extension.builder');

import ShareSessionConfigurationBuilder = require('./share.session.configuration.builder');
import ShareSessionNotificationBuilder = require('./share.session.notification.builder');
import ShareSessionConfiguration = require('./share.session.configuration');
import DigitalIdentityServiceError = require('./digital.identity.service.error');
import { buildApplicationContentFromEncryptedContent, buildUserContentFromEncryptedContent } from './receipts/content.factory';

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

    /** @private */
    this.sdkId = sdkId;
    /** @private */
    this.pem = pem;
    /** @private */
    this.apiUrl = apiUrl;
  }

  /**
   * @param {ShareSessionConfiguration} shareSessionConfig
   *
   * @returns {Promise<CreateShareSessionResult>}
   */
  async createShareSession(shareSessionConfig) {
    Validation.instanceOf(shareSessionConfig, ShareSessionConfiguration, 'shareSessionConfig');

    const payload = new Payload(shareSessionConfig);

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem.toString())
      .withEndpoint('/v2/sessions')
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
   * @param {string} sessionId
   *
   * @returns {Promise<GetShareSessionResult>}
   */
  async getShareSession(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem.toString())
      .withEndpoint(`/v2/sessions/${sessionId}`)
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
   * @param {string} sessionId
   * @returns {Promise<CreateShareQrCodeResult>}
   */
  async createShareQrCode(sessionId) {
    Validation.isString(sessionId, 'sessionId');

    const payload = new Payload({});

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem.toString())
      .withEndpoint(`/v2/sessions/${sessionId}/qr-codes`)
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
   * @param {string} qrCodeId
   * @returns {Promise<GetShareQrCodeResult>}
   */
  async getShareQrCode(qrCodeId) {
    Validation.isString(qrCodeId, 'qrCodeId');

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withHeader('X-Yoti-Auth-Id', this.sdkId)
      .withPemString(this.pem.toString())
      .withEndpoint(`/v2/qr-codes/${qrCodeId}`)
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
      .withPemString(this.pem.toString())
      .withEndpoint(`/v2/receipts/${receiptIdUrl}`)
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
      .withPemString(this.pem.toString())
      .withEndpoint(`/v2/wrapped-item-keys/${receiptItemKeyId}`)
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

export { DigitalIdentityService };

export const DigitalIdentityBuilders = {
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
};
