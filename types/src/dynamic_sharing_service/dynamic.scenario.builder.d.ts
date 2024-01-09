export = DynamicScenarioBuilder;
declare class DynamicScenarioBuilder {
    /** @private */
    private extensions;
    /**
     * @param {string} callbackEndpoint
     */
    withCallbackEndpoint(callbackEndpoint: string): this;
    callbackEndpoint: string;
    /**
     * @typedef {import('./policy/dynamic.policy.js')} DynamicPolicy
     * @param {DynamicPolicy} dynamicPolicy
     */
    withPolicy(dynamicPolicy: import("./policy/dynamic.policy.js")): this;
    dynamicPolicy: import("./policy/dynamic.policy.js");
    /**
     * @typedef {import('./extension/extension.js')} Extension
     *
     * @param {Extension} extension
     */
    withExtension(extension: import("./extension/extension.js")): this;
    /**
     * @param {Object} subject
     */
    withSubject(subject: any): this;
    subject: any;
    /**
     * @returns {DynamicScenario}
     */
    build(): DynamicScenario;
}
import DynamicScenario = require("./dynamic.scenario");
