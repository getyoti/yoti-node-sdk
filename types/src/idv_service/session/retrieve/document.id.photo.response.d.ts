export = DocumentIdPhotoResponse;
declare class DocumentIdPhotoResponse {
    constructor(documentFields: any);
    /** @private */
    private media;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
