export = DynamicPolicy;
declare class DynamicPolicy {
    /**
     * @param {WantedAttribute[]} wantedAttributes - array of attributes to be requested.
     * @param {number[]} wantedAuthTypes - auth types represents the authentication type to be used.
     * @param {boolean} wantedRememberMe
     * @param {object} identityProfileRequirements
     */
    constructor(wantedAttributes: WantedAttribute[], wantedAuthTypes: number[], wantedRememberMe?: boolean, identityProfileRequirements?: object);
    wantedAttributes: WantedAttribute[];
    wantedAuthTypes: any[];
    wantedRememberMe: boolean;
    identityProfileRequirements: any;
    /**
     * @returns {WantedAttribute[]} array of attributes to be requested.
     */
    getWantedAttributes(): WantedAttribute[];
    /**
     * @returns {number[]} auth types represents the authentication type to be used.
     */
    getWantedAuthTypes(): number[];
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
