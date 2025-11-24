import RequestedCheck = require('./requested.check');
import IDVConstants = require('../../../idv.constants');
import Validation = require('../../../../yoti_common/validation');
import RequestedThirdPartyIdentityConfig = require('./requested.third.party.identity.config');

/**
 * @class RequestedThirdPartyIdentityCheck
 */
class RequestedThirdPartyIdentityCheck extends RequestedCheck {
  /**
   * @param {RequestedThirdPartyIdentityConfig} config
   */
  constructor(config) {
    Validation.instanceOf(config, RequestedThirdPartyIdentityConfig, 'config');
    super(IDVConstants.THIRD_PARTY_IDENTITY, config);
  }
}

export default RequestedThirdPartyIdentityCheck;
