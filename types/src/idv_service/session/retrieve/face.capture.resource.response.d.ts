export = FaceCaptureResourceResponse;
declare class FaceCaptureResourceResponse extends ResourceResponse {
    /** @private */
    private image;
    /**
     * @return FaceCaptureImageResponse
     */
    getImage(): FaceCaptureImageResponse;
}
import ResourceResponse = require("./resource.response");
import FaceCaptureImageResponse = require("./face.capture.image.response");
