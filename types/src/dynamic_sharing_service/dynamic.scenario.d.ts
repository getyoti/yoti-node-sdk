export = DynamicScenario;
declare class DynamicScenario {
    /**
     * @param {string} callbackEndpoint
     *   The device's callback endpoint. Must be a URL relative to the Application
     *   Domain specified in your Yoti Hub.
     * @param {DynamicPolicy} dynamicPolicy
     *   The customisable DynamicPolicy to use in the share.
     * @param {Extension[]} extensions
     *   List of Extension to be activated for the application.
     * @param {Object} subject
     *   The subject describing data.
     */
    constructor(callbackEndpoint: string, dynamicPolicy: DynamicPolicy, extensions: Extension[], subject: any);
    /** @private */
    private callbackEndpoint;
    /** @private */
    private dynamicPolicy;
    /** @private */
    private extensions;
    /** @private */
    private subject;
    /**
     * @returns {string} The device's callback endpoint.
     */
    getCallbackEndpoint(): string;
    /**
     * @returns {DynamicPolicy} The customisable DynamicPolicy to use in the share.
     */
    getDynamicPolicy(): DynamicPolicy;
    /**
     * @returns {Extension[]} List of Extension to be activated for the application.
     */
    getExtensions(): Extension[];
    /**
     * @returns {Object} The subject describing data.
     */
    getSubject(): any;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import DynamicPolicy = require("./policy/dynamic.policy");
import Extension = require("./extension/extension");
