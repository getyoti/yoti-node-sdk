export = PageResponse;
declare class PageResponse {
    constructor(page: any);
    /** @private */
    private captureMethod;
    /** @private */
    private media;
    /** @private */
    private frames;
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
