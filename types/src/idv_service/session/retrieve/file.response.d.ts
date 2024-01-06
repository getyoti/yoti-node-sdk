export = FileResponse;
declare class FileResponse {
    constructor(file: any);
    /** @private */
    private media;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
