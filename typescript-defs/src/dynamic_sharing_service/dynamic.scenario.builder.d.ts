export = DynamicScenarioBuilder;
declare class DynamicScenarioBuilder {
    extensions: any[];
    /**
     * @param {string} callbackEndpoint
     */
    withCallbackEndpoint(callbackEndpoint: string): import("./dynamic.scenario.builder");
    callbackEndpoint: string;
    /**
     * @param {DynamicPolicy} dynamicPolicy
     */
    withPolicy(dynamicPolicy: any): import("./dynamic.scenario.builder");
    dynamicPolicy: any;
    /**
     * @param {Extension} extension
     */
    withExtension(extension: any): import("./dynamic.scenario.builder");
    /**
     * @returns {DynamicScenario}
     */
    build(): DynamicScenario;
}
import DynamicScenario = require("./dynamic.scenario");
