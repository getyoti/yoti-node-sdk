export = FaceMapResponse;
declare class FaceMapResponse {
    constructor(facemap: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
