export = RequiredSupplementaryDocumentResourceResponse;
declare class RequiredSupplementaryDocumentResourceResponse extends RequiredDocumentResourceResponse {
    /** @private */
    private documentTypes;
    /** @private */
    private countryCodes;
    /** @private */
    private objective;
    /**
     * Returns a list of document types that can be used to satisfy the requirement
     *
     * @return {string[] | null}
     */
    getDocumentTypes(): string[] | null;
    /**
     * Returns a list of country codes that can be used to satisfy the requirement
     *
     * @return {string[] | null}
     */
    getCountryCodes(): string[] | null;
    /**
     * Returns the objective that the
     * {@link RequiredSupplementaryDocumentResourceResponse} will satisfy
     *
     * @return {ObjectiveResponse | null}
     */
    getObjective(): ObjectiveResponse | null;
}
import RequiredDocumentResourceResponse = require("./required.document.resource.response");
import ObjectiveResponse = require("./objective.response");
