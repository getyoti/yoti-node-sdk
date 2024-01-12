export = DocumentRestrictionsFilter;
declare class DocumentRestrictionsFilter extends DocumentFilter {
    /**
     * @param {string} inclusion
     * @param {DocumentRestriction[]} documents
     * @param {Boolean} allowExpiredDocuments
     * @param {Boolean} allowNonLatinDocuments
     */
    constructor(inclusion: string, documents: DocumentRestriction[], allowExpiredDocuments: boolean, allowNonLatinDocuments: boolean);
    /** @private */
    private inclusion;
    /** @private */
    private documents;
    /** @private */
    private allowExpiredDocuments;
    /** @private */
    private allowNonLatinDocuments;
}
import DocumentFilter = require("../document.filter");
import DocumentRestriction = require("./document.restriction");
