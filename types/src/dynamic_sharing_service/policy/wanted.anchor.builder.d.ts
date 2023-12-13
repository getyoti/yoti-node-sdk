export = WantedAnchorBuilder;
declare class WantedAnchorBuilder {
    /**
     * @param {string} value
     */
    withValue(value: string): this;
    value: string;
    /**
     * @param {string} subType
     */
    withSubType(subType: string): this;
    subType: string;
    /**
     * @returns {WantedAnchor}
     */
    build(): WantedAnchor;
}
import WantedAnchor = require("./wanted.anchor");
