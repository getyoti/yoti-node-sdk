export = RawResultsResponse;
declare class RawResultsResponse {
    constructor(rawResults: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
