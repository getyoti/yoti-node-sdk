'use strict';

const config = require('../../config');
const { RequestBuilder } = require('../request/request.builder');
const { Payload } = require('../request/payload');

const DynamicScenarioBuilder = require('./dynamic.scenario.builder');
const DynamicScenario = require('./dynamic.scenario');
const DynamicPolicyBuilder = require('./policy/dynamic.policy.builder');
const WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
const ExtensionBuilder = require('./extension/extension.builder');
const LocationConstraintExtensionBuilder = require('./extension/location.constraint.extension.builder');
const TransactionalFlowExtensionBuilder = require('./extension/transactional.flow.extension.builder');
const ThirdPartyAttributeExtensionBuilder = require('./extension/third.party.attribute.extension.builder');
const WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
const ConstraintsBuilder = require('./policy/constraints.builder');
const SourceConstraintBuilder = require('./policy/source.constraint.builder');
const ShareUrlResult = require('./share.url.result');
const Validation = require('../yoti_common/validation');

const DEFAULT_API_URL = config.yoti.connectApi;

/**
 * Service Class to handle interactions with the dynamic share API
 *
 * @class DynamicShareService
 */
class DynamicShareService {
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

  createShareUrl(dynamicScenario) {
    Validation.instanceOf(dynamicScenario, DynamicScenario, 'dynamicScenario');

    const payload = new Payload(dynamicScenario);

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withPemString(this.pem)
      .withEndpoint(`/qrcodes/apps/${this.sdkId}`)
      .withQueryParam('appId', this.sdkId)
      .withMethod('POST');

    requestBuilder.withPayload(payload);

    const request = requestBuilder.build();

    return new Promise((resolve, reject) => {
      request.execute()
        .then((response) => {
          try {
            const parsedResponse = response.getParsedResponse();
            return resolve(new ShareUrlResult(parsedResponse));
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
const createShareUrl = (dynamicScenario, pem, sdkId) => {
  const dynamicShareService = new DynamicShareService(sdkId, pem);
  return dynamicShareService.createShareUrl(dynamicScenario);
};

module.exports = {
  createShareUrl,
  DynamicShareService,
  DynamicScenarioBuilder,
  DynamicPolicyBuilder,
  WantedAttributeBuilder,
  ExtensionBuilder,
  LocationConstraintExtensionBuilder,
  TransactionalFlowExtensionBuilder,
  ThirdPartyAttributeExtensionBuilder,
  WantedAnchorBuilder,
  ConstraintsBuilder,
  SourceConstraintBuilder,
};
