export = DocumentFieldsResponse;
declare class DocumentFieldsResponse {
    constructor(documentFields: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
