export = RequiredIdDocument;
declare class RequiredIdDocument extends RequiredDocument {
    /**
     * @param {DocumentFilter} filter
     */
    constructor(filter: DocumentFilter);
    /** @private */
    private filter;
}
import RequiredDocument = require("./required.document");
import DocumentFilter = require("./document.filter");
