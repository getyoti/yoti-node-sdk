export = BaseContent;
declare class BaseContent {
    /**
     * @param {[]} extraData
     */
    constructor(extraData?: []);
    extraData: ExtraData;
    /**
     * Get the user extra data
     * @returns {ExtraData}
     */
    getExtraData(): ExtraData;
}
import ExtraData = require("./extra.data");
