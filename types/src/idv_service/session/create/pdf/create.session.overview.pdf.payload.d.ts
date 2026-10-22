export = CreateSessionOverviewPdfPayload;
/**
 *
 * @class CreateSessionOverviewPdfPayload
 */
declare class CreateSessionOverviewPdfPayload {
    /**
     * @param {boolean} [includeImages]
     * @param {boolean} [includeExtractedText]
     * @param {boolean} [includeDeviceTracking]
     */
    constructor(includeImages?: boolean, includeExtractedText?: boolean, includeDeviceTracking?: boolean);
    /** @private */
    private includeImages;
    /** @private */
    private includeExtractedText;
    /** @private */
    private includeDeviceTracking;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        include_images: boolean;
        include_extracted_text: boolean;
        include_device_tracking: boolean;
    };
}
