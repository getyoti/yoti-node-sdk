'use strict';

const config = require('../../config');
const Validation = require('../yoti_common/validation');

const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');
const ShareSessionCreateResult = require('./share.session.create.result');

const PolicyBuilder = require('./policy/policy.builder');
const WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
const WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
const ConstraintsBuilder = require('./policy/constraints.builder');
const SourceConstraintBuilder = require('./policy/source.constraint.builder');
const ExtensionBuilder = require('./extension/extension.builder');
const LocationConstraintExtensionBuilder = require('./extension/location.constraint.extension.builder');
const TransactionalFlowExtensionBuilder = require('./extension/transactional.flow.extension.builder');
const ThirdPartyAttributeExtensionBuilder = require('./extension/third.party.attribute.extension.builder');
const ShareSessionConfigurationBuilder = require('./share.session.configuration.builder');
const ShareSessionNotificationBuilder = require('./share.session.notification.builder');
const ShareSessionConfiguration = require('./share.session.configuration');

const DEFAULT_API_URL = config.yoti.digitalIdentityApi;

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
   * @returns {Promise<ShareSessionCreateResult>}
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

      throw error;
    }

    try {
      const parsedResponse = response.getParsedResponse();

      return new ShareSessionCreateResult(parsedResponse);
    } catch (err) {
      console.log(`Error getting response data: ${err}`);

      throw err;
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
 * @returns {Promise} containing a ShareSessionCreateResult
 */
const createShareSession = (shareSessionConfig, pem, sdkId) => {
  const digitalIdentityService = new DigitalIdentityService(sdkId, pem);
  return digitalIdentityService.createShareSession(shareSessionConfig);
};

module.exports = {
  createShareSession,
  DigitalIdentityService,
  DigitalIdentityBuilders: {
    ExtensionBuilder,
    LocationConstraintExtensionBuilder,
    TransactionalFlowExtensionBuilder,
    ThirdPartyAttributeExtensionBuilder,
    ShareSessionConfigurationBuilder,
    ShareSessionNotificationBuilder,
    PolicyBuilder,
    WantedAttributeBuilder,
    WantedAnchorBuilder,
    ConstraintsBuilder,
    SourceConstraintBuilder,
  },
};
