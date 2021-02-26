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
     */
    constructor(callbackEndpoint: string, dynamicPolicy: DynamicPolicy, extensions: Extension[]);
    callbackEndpoint: string;
    dynamicPolicy: DynamicPolicy;
    extensions: Extension[];
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
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import DynamicPolicy = require("./policy/dynamic.policy");
import Extension = require("./extension/extension");
