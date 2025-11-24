import RequestedThirdPartyIdentityCheck = require('./requested.third.party.identity.check');
import RequestedThirdPartyIdentityConfig = require('./requested.third.party.identity.config');

/**
 * Builder to assist the creation of {@link RequestedThirdPartyIdentityCheck}.
 *
 * @class RequestedThirdPartyIdentityCheckBuilder
 */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["build"] }] */
class RequestedThirdPartyIdentityCheckBuilder {
  build() {
    return new RequestedThirdPartyIdentityCheck(new RequestedThirdPartyIdentityConfig());
  }
}

export default RequestedThirdPartyIdentityCheckBuilder;
