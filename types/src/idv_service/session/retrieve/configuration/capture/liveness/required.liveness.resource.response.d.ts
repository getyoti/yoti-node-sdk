export = RequiredLivenessResourceResponse;
declare class RequiredLivenessResourceResponse extends RequiredResourceResponse {
    livenessType: any;
    /**
       * @return {string | null}
       */
    getLivenessType(): string | null;
}
import RequiredResourceResponse = require("../required.resource.response");
