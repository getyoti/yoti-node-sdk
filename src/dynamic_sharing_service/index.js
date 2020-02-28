'use strict';

const { Payload } = require('../request/payload');
const yotiRequest = require('../request');

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
  Validation.instanceOf(dynamicScenario, DynamicScenario, 'dynamicScenario');

  const payload = new Payload(dynamicScenario);
  const request = yotiRequest.buildConnectApiRequest(
    'POST',
    `/qrcodes/apps/${sdkId}`,
    pem,
    sdkId,
    payload
  );

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
};

module.exports = {
  createShareUrl,
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
