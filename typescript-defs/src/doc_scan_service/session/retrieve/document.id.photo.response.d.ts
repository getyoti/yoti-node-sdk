export = DocumentIdPhotoResponse;
declare class DocumentIdPhotoResponse {
    constructor(documentFields: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
