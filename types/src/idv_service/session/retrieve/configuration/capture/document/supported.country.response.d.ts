export = SupportedCountryResponse;
declare class SupportedCountryResponse {
    /**
     * @param {object} supportedCountry
     */
    constructor(supportedCountry: object);
    code: any;
    supportedDocuments: any;
    /**
     * Returns the ISO Country Code of the supported country
     *
     * @return {string | null}
     */
    getCode(): string | null;
    /**
     * Returns a list of document types that are supported for the country code
     *
     * @return {SupportedDocumentResponse[] | null}
     */
    getSupportedDocuments(): SupportedDocumentResponse[] | null;
}
import SupportedDocumentResponse = require("./supported.document.response");
