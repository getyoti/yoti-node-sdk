export = RequiredIdDocumentResourceResponse;
declare class RequiredIdDocumentResourceResponse extends RequiredDocumentResourceResponse {
    /** @private */
    private supportedCountries;
    /** @private */
    private allowedCaptureMethods;
    /** @private */
    private attemptsRemaining;
    /**
     * Returns a list of supported country codes, that can be used
     * to satisfy the requirement.  Each supported country will contain
     * a list of document types that can be used.
     *
     * @return {SupportedCountryResponse[] | null}
     */
    getSupportedCountries(): SupportedCountryResponse[] | null;
    /**
     * Returns the allowed capture method as a String
     *
     * @return {string | null}
     */
    getAllowedCaptureMethods(): string | null;
    /**
     * Returns a Map, that is used to track how many attempts are
     * remaining when performing text-extraction.
     *
     * @return {object | null}
     */
    getAttemptsRemaining(): object | null;
}
import RequiredDocumentResourceResponse = require("./required.document.resource.response");
import SupportedCountryResponse = require("./supported.country.response");
