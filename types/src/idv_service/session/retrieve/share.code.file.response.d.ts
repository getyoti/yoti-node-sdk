export = ShareCodeFileResponse;
declare class ShareCodeFileResponse {
    constructor(file: any);
    /** @private */
    private media;
    /**
     * @return MediaResponse
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
