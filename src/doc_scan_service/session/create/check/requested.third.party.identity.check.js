'use strict';

const RequestedCheck = require('./requested.check');
const DocScanConstants = require('../../../doc.scan.constants');
const Validation = require('../../../../yoti_common/validation');
const RequestedThirdPartyIdentityConfig = require('./requested.third.party.identity.config');

/**
 * @class RequestedThirdPartyIdentityCheck
 */
class RequestedThirdPartyIdentityCheck extends RequestedCheck {
  /**
   * @param {RequestedThirdPartyIdentityConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedThirdPartyIdentityConfig, 'config');
    super(DocScanConstants.THIRD_PARTY_IDENTITY, config);
  }
}

module.exports = RequestedThirdPartyIdentityCheck;
