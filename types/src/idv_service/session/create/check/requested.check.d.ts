export = RequestedCheck;
/**
 * Requests creation of a Check to be performed on a document
 *
 * @class RequestedCheck
 */
declare class RequestedCheck {
    /**
     * @param {string} type
     *   The type of the Check to create
     * @param {*} config
     *   The configuration to apply to the Check
     */
    constructor(type: string, config: any);
    type: string;
    config: any;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
