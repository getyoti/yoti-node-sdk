export = RequestedFaceMatchConfig;
/**
 * The configuration applied when creating a FaceMatchCheck
 *
 * @class RequestedFaceMatchConfig
 */
declare class RequestedFaceMatchConfig {
    /**
     * @param {string} manualCheck
     *   The value for a manual check for a given face match.
     */
    constructor(manualCheck: string);
    /** @private */
    private manualCheck;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
