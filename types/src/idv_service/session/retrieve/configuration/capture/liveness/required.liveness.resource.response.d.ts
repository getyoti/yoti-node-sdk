export = RequiredLivenessResourceResponse;
declare class RequiredLivenessResourceResponse extends RequiredResourceResponse {
    /** @private */
    private livenessType;
    /**
       * @return {string | null}
       */
    getLivenessType(): string | null;
}
import RequiredResourceResponse = require("../required.resource.response");
