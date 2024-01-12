export = RawResultsResponse;
declare class RawResultsResponse {
    constructor(rawResults: any);
    /** @private */
    private media;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
