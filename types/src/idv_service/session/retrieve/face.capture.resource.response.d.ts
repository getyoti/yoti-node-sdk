export = FaceCaptureResourceResponse;
declare class FaceCaptureResourceResponse extends ResourceResponse {
    image: FaceCaptureImageResponse;
    /**
     * @return FaceCaptureImageResponse
     */
    getImage(): FaceCaptureImageResponse;
}
import ResourceResponse = require("./resource.response");
import FaceCaptureImageResponse = require("./face.capture.image.response");
