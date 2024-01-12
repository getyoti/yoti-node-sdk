export = WantedAnchorBuilder;
declare class WantedAnchorBuilder {
    /**
     * @param {string} value
     * @returns this
     */
    withValue(value: string): this;
    value: string;
    /**
     * @param {string} subType
     * @returns this
     */
    withSubType(subType: string): this;
    subType: string;
    /**
     * @returns {WantedAnchor}
     */
    build(): WantedAnchor;
}
import WantedAnchor = require("./wanted.anchor");
