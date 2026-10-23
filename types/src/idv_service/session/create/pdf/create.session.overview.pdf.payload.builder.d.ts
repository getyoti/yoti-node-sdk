export = CreateSessionOverviewPdfPayloadBuilder;
/**
 *
 * @class CreateSessionOverviewPdfPayloadBuilder
 */
declare class CreateSessionOverviewPdfPayloadBuilder {
    /**
     * Sets the flag to include images or not
     *
     * @param {boolean} includeImages
     * @return CreateSessionOverviewPdfPayloadBuilder
     */
    withIncludeImages(includeImages: boolean): this;
    /** @private */
    private includeImages;
    /**
     * Sets the flag to include extracted text or not
     *
     * @param {boolean} includeExtractedText
     * @return CreateSessionOverviewPdfPayloadBuilder
     */
    withIncludeExtractedText(includeExtractedText: boolean): this;
    /** @private */
    private includeExtractedText;
    /**
     * Sets the flag to include device tracking or not
     *
     * @param {boolean} includeDeviceTracking
     * @return CreateSessionOverviewPdfPayloadBuilder
     */
    withIncludeDeviceTracking(includeDeviceTracking: boolean): this;
    /** @private */
    private includeDeviceTracking;
    build(): CreateSessionOverviewPdfPayload;
}
import CreateSessionOverviewPdfPayload = require("./create.session.overview.pdf.payload");
