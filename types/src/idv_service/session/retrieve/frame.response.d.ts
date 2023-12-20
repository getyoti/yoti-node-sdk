export = FrameResponse;
declare class FrameResponse {
    constructor(frame: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
