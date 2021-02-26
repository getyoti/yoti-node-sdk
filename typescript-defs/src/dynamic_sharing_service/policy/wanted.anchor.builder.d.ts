export = WantedAnchorBuilder;
declare class WantedAnchorBuilder {
    /**
     * @param {string} value
     */
    withValue(value: string): import("./wanted.anchor.builder");
    value: string;
    /**
     * @param {string} subType
     */
    withSubType(subType: string): import("./wanted.anchor.builder");
    subType: string;
    /**
     * @returns {WantedAnchor}
     */
    build(): WantedAnchor;
}
import WantedAnchor = require("./wanted.anchor");
