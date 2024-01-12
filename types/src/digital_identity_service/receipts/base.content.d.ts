export = BaseContent;
declare class BaseContent {
    /**
     * @param {{ [k: string]: any }[]} extraData
     */
    constructor(extraData?: {
        [k: string]: any;
    }[]);
    /** @private */
    private extraData;
    /**
     * Get the user extra data
     * @returns {ExtraData}
     */
    getExtraData(): ExtraData;
}
import ExtraData = require("./extra.data");
