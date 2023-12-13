export = ExpandedDocumentFieldsResponse;
declare class ExpandedDocumentFieldsResponse {
    constructor(expandedDocumentFields: any);
    media: MediaResponse;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
