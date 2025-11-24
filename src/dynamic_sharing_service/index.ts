import config = require('../../config');
import { RequestBuilder } from '../request/request.builder';
import { Payload } from '../request/payload';

import DynamicScenarioBuilder = require('./dynamic.scenario.builder');
import DynamicScenario = require('./dynamic.scenario');
import DynamicPolicyBuilder = require('./policy/dynamic.policy.builder');
import WantedAttributeBuilder = require('./policy/wanted.attribute.builder');
import ExtensionBuilder = require('./extension/extension.builder');
import LocationConstraintExtensionBuilder = require('./extension/location.constraint.extension.builder');
import TransactionalFlowExtensionBuilder = require('./extension/transactional.flow.extension.builder');
import ThirdPartyAttributeExtensionBuilder = require('./extension/third.party.attribute.extension.builder');
import WantedAnchorBuilder = require('./policy/wanted.anchor.builder');
import ConstraintsBuilder = require('./policy/constraints.builder');
import SourceConstraintBuilder = require('./policy/source.constraint.builder');
import ShareUrlResult = require('./share.url.result');
import Validation = require('../yoti_common/validation');

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
   * @param {{apiUrl?: string}} options
   */
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

  createShareUrl(dynamicScenario) {
    Validation.instanceOf(dynamicScenario, DynamicScenario, 'dynamicScenario');

    const payload = new Payload(dynamicScenario);

    const requestBuilder = new RequestBuilder()
      .withBaseUrl(this.apiUrl)
      .withPemString(this.pem.toString())
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

export {
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
