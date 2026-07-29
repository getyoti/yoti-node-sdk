export = DocumentRestrictionsFilterBuilder;
/**
 * @typedef {import('./../allowed.provider')} AllowedProvider
 */
declare class DocumentRestrictionsFilterBuilder {
    /** @private */
    private documents;
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
     * @param {Boolean} allowDigitalIds
     *
     * @returns {this}
     */
    withAllowDigitalIds(allowDigitalIds: boolean): this;
    allowDigitalIds: boolean;
    /**
     * @param {AllowedProvider[]} allowedProviders
     *
     * @returns {this}
     */
    withAllowedProviders(allowedProviders: AllowedProvider[]): this;
    allowedProviders: import("./../allowed.provider")[];
    /**
     * @returns {DocumentRestrictionsFilter}
     */
    build(): DocumentRestrictionsFilter;
}
declare namespace DocumentRestrictionsFilterBuilder {
    export { AllowedProvider };
}
import DocumentRestriction = require("./document.restriction");
import DocumentRestrictionsFilter = require("./document.restrictions.filter");
type AllowedProvider = import('./../allowed.provider');
