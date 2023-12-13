export = DocumentRestrictionsFilterBuilder;
declare class DocumentRestrictionsFilterBuilder {
    documents: any[];
    /**
     * @returns {this}
     */
    forWhitelist(): this;
    inclusion: "WHITELIST" | "BLACKLIST";
    /**
     * @returns {this}
     */
    forBlacklist(): this;
    /**
     * @param {DocumentRestriction} documentRestriction
     *
     * @returns {this}
     */
    withDocumentRestriction(documentRestriction: DocumentRestriction): this;
    /**
     * @param {Boolean} allowExpiredDocuments
     *
     * @returns {this}
     */
    withAllowExpiredDocuments(allowExpiredDocuments: boolean): this;
    allowExpiredDocuments: boolean;
    /**
     * @param {Boolean} allowNonLatinDocuments
     *
     * @returns {this}
     */
    withAllowNonLatinDocuments(allowNonLatinDocuments: boolean): this;
    allowNonLatinDocuments: boolean;
    /**
     * @returns {DocumentRestrictionsFilter}
     */
    build(): DocumentRestrictionsFilter;
}
import DocumentRestriction = require("./document.restriction");
import DocumentRestrictionsFilter = require("./document.restrictions.filter");
