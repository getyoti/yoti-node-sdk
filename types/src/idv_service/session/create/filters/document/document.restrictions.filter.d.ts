export = DocumentRestrictionsFilter;
/**
 * @typedef {import('./../allowed.provider')} AllowedProvider
 */
declare class DocumentRestrictionsFilter extends DocumentFilter {
    /**
     * @param {string} inclusion
     * @param {DocumentRestriction[]} documents
     * @param {Boolean} allowExpiredDocuments
     * @param {Boolean} allowNonLatinDocuments
     * @param {boolean} allowDigitalIds
     * @param {AllowedProvider[]} allowedProviders
     */
    constructor(inclusion: string, documents: DocumentRestriction[], allowExpiredDocuments: boolean, allowNonLatinDocuments: boolean, allowDigitalIds: boolean, allowedProviders: AllowedProvider[]);
    /** @private */
    private inclusion;
    /** @private */
    private documents;
}
declare namespace DocumentRestrictionsFilter {
    export { AllowedProvider };
}
import DocumentFilter = require("../document.filter");
import DocumentRestriction = require("./document.restriction");
type AllowedProvider = import('./../allowed.provider');
