export = FaceCaptureImageResponse;
declare class FaceCaptureImageResponse {
    constructor(image: any);
    /** @private */
    private media;
    /**
     * @return MediaResponse
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
