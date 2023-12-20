export = DocumentRestrictionsFilter;
declare class DocumentRestrictionsFilter extends DocumentFilter {
    /**
     * @param {string} inclusion
     * @param {DocumentRestriction[]} documents
     * @param {Boolean} allowExpiredDocuments
     * @param {Boolean} allowNonLatinDocuments
     */
    constructor(inclusion: string, documents: DocumentRestriction[], allowExpiredDocuments: boolean, allowNonLatinDocuments: boolean);
    inclusion: string;
    documents: DocumentRestriction[];
    allowExpiredDocuments: boolean;
    allowNonLatinDocuments: boolean;
}
import DocumentFilter = require("../document.filter");
import DocumentRestriction = require("./document.restriction");
