export = RequestedTask;
/**
 * Requests creation of a Task to be performed on each document
 *
 * @class RequestedTask
 */
declare class RequestedTask {
    /**
     * @param {string} type
     *   The type of the Task to create
     * @param {*} config
     *   Configuration to apply to the Task
     */
    constructor(type: string, config: any);
    /** @private */
    private type;
    /** @private */
    private config;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
