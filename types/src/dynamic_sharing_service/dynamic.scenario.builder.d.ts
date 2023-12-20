export = DynamicScenarioBuilder;
declare class DynamicScenarioBuilder {
    extensions: any[];
    /**
     * @param {string} callbackEndpoint
     */
    withCallbackEndpoint(callbackEndpoint: string): this;
    callbackEndpoint: string;
    /**
     * @param {DynamicPolicy} dynamicPolicy
     */
    withPolicy(dynamicPolicy: DynamicPolicy): this;
    dynamicPolicy: DynamicPolicy;
    /**
     * @param {Extension} extension
     */
    withExtension(extension: Extension): this;
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
