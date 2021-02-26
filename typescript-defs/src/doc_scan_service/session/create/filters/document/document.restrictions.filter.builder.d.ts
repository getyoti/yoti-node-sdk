export = DocumentRestrictionsFilterBuilder;
declare class DocumentRestrictionsFilterBuilder {
    documents: any[];
    /**
     * @returns {this}
     */
    forWhitelist(): this;
    inclusion: string;
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
     * @returns {DocumentRestrictionsFilter}
     */
    build(): DocumentRestrictionsFilter;
}
import DocumentRestriction = require("./document.restriction");
import DocumentRestrictionsFilter = require("./document.restrictions.filter");
