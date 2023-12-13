export = Policy;
declare class Policy {
    /**
     * @param {WantedAttribute[]} wantedAttributes - array of attributes to be requested.
     * @param {integer[]} wantedAuthTypes - auth types represents the authentication type to be used.
     * @param {boolean} wantedRememberMe
     * @param {object} identityProfileRequirements
     */
    constructor(wantedAttributes: WantedAttribute[], wantedAuthTypes: integer[], wantedRememberMe?: boolean, identityProfileRequirements?: object);
    wantedAttributes: WantedAttribute[];
    wantedAuthTypes: any[];
    wantedRememberMe: boolean;
    identityProfileRequirements: any;
    /**
     * @returns {WantedAttribute[]} array of attributes to be requested.
     */
    getWantedAttributes(): WantedAttribute[];
    /**
     * @returns {integer[]} auth types represents the authentication type to be used.
     */
    getWantedAuthTypes(): integer[];
    /**
     * @returns {boolean}
     */
    getWantedRememberMe(): boolean;
    /**
     * @return {Object}
     */
    getIdentityProfileRequirements(): any;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import WantedAttribute = require("./wanted.attribute");
