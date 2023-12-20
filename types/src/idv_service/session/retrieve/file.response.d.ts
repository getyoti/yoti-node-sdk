export = FileResponse;
declare class FileResponse {
    constructor(file: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
