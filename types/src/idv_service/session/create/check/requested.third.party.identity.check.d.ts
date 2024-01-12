export = RequestedThirdPartyIdentityCheck;
/**
 * @class RequestedThirdPartyIdentityCheck
 */
declare class RequestedThirdPartyIdentityCheck extends RequestedCheck {
    /**
     * @param {RequestedThirdPartyIdentityConfig} config
     */
    constructor(config: RequestedThirdPartyIdentityConfig);
}
import RequestedCheck = require("./requested.check");
import RequestedThirdPartyIdentityConfig = require("./requested.third.party.identity.config");
