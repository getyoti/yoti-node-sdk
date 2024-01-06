export = BaseContent;
declare class BaseContent {
    /**
     * @param {[]} extraData
     */
    constructor(extraData?: []);
    /** @private */
    private extraData;
    /**
     * Get the user extra data
     * @returns {ExtraData}
     */
    getExtraData(): ExtraData;
}
import ExtraData = require("./extra.data");
