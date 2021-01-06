'use strict';

const RequestedThirdPartyIdentityCheck = require('./requested.third.party.identity.check');
const RequestedThirdPartyIdentityConfig = require('./requested.third.party.identity.config');

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

module.exports = RequestedThirdPartyIdentityCheckBuilder;
