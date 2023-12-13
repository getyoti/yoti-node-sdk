export = FaceCaptureImageResponse;
declare class FaceCaptureImageResponse {
    constructor(image: any);
    media: MediaResponse;
    /**
     * @return MediaResponse
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
