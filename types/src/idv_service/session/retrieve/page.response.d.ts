export = PageResponse;
declare class PageResponse {
    constructor(page: any);
    captureMethod: any;
    media: MediaResponse;
    frames: any;
    /**
     * @returns {string}
     */
    getCaptureMethod(): string;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
    /**
     * @returns {FrameResponse[]}
     */
    getFrames(): FrameResponse[];
}
import MediaResponse = require("./media.response");
import FrameResponse = require("./frame.response");
