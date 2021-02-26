export = DocumentRestrictionsFilter;
declare class DocumentRestrictionsFilter extends DocumentFilter {
    /**
     * @param {string} inclusion
     * @param {DocumentRestriction[]} documents
     */
    constructor(inclusion: string, documents: DocumentRestriction[]);
    inclusion: string;
    documents: DocumentRestriction[];
}
import DocumentFilter = require("../document.filter");
import DocumentRestriction = require("./document.restriction");
