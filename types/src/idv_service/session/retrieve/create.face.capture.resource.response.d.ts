export = CreateFaceCaptureResourceResponse;
declare class CreateFaceCaptureResourceResponse {
    /**
     * @param {{id: string, frames: number}} resourceData
     */
    constructor(resourceData: {
        id: string;
        frames: number;
    });
    /** @private */
    private id;
    /** @private */
    private frames;
    /**
     * Returns the ID of the newly created Face Capture resource
     *
     * @return string
     */
    getId(): string;
    /**
     * Returns the number of image frames required
     *
     * @return int
     */
    getFrames(): number;
}
