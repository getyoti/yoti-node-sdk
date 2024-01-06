export = ExpandedDocumentFieldsResponse;
declare class ExpandedDocumentFieldsResponse {
    constructor(expandedDocumentFields: any);
    /** @private */
    private media;
    /**
     * @returns {MediaResponse}
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
