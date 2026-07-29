export = DocumentFilter;
declare class DocumentFilter {
    /**
     * @param {string} type
     * @param {boolean} allowExpiredDocuments
     * @param {boolean} allowNonLatinDocuments
     * @param {boolean} allowDigitalIds
     * @param {AllowedProvider[]} allowedProviders
     */
    constructor(type: string, allowExpiredDocuments: boolean, allowNonLatinDocuments: boolean, allowDigitalIds: boolean, allowedProviders: AllowedProvider[]);
    /** @private */
    private type;
    /** @private */
    private allowExpiredDocuments;
    /** @private */
    private allowNonLatinDocuments;
    /** @private */
    private allowDigitalIds;
    /** @private */
    private allowedProviders;
    /**
     * Whether to allow non latin documents
     *
     * @return {boolean} flag
     */
    getAllowNonLatinDocuments(): boolean;
    /**
     * Whether to allow non expired documents
     *
     * @return {boolean} flag
     */
    getAllowExpiredDocuments(): boolean;
    /**
     * Whether to allow digital IDs to satisfy the filter
     *
     * @return boolean flag
     */
    getAllowDigitalIds(): boolean;
    /**
     * The list of digital ID providers that are allowed to satisfy the filter
     *
     * @return AllowedProvider[] the allowed providers
     */
    getAllowedProviders(): AllowedProvider[];
    toJSON(): {
        type: string;
    };
}
import AllowedProvider = require("./allowed.provider");
