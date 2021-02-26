export = DynamicPolicy;
declare class DynamicPolicy {
    /**
     * @param {WantedAttribute[]} wantedAttributes - array of attributes to be requested.
     * @param {integer[]} wantedAuthTypes - auth types represents the authentication type to be used.
     * @param {boolean} wantedRememberMe
     */
    constructor(wantedAttributes: WantedAttribute[], wantedAuthTypes: any[], wantedRememberMe?: boolean);
    wantedAttributes: WantedAttribute[];
    wantedAuthTypes: any[];
    wantedRememberMe: boolean;
    /**
     * @returns {WantedAttribute[]} array of attributes to be requested.
     */
    getWantedAttributes(): WantedAttribute[];
    /**
     * @returns {integer[]} auth types represents the authentication type to be used.
     */
    getWantedAuthTypes(): any[];
    /**
     * @returns {boolean}
     */
    getWantedRememberMe(): boolean;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import WantedAttribute = require("./wanted.attribute");
