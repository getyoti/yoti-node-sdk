export = ResourceContainer;
declare class ResourceContainer {
    constructor(resources: any);
    idDocuments: any;
    supplementaryDocuments: any;
    livenessCapture: any;
    faceCapture: any;
    /**
     * Returns ID documents that were uploaded by the user
     *
     * @returns {IdDocumentResourceResponse[]}
     *   The list of ID documents
     */
    getIdDocuments(): IdDocumentResourceResponse[];
    /**
     * Returns supplementary documents that were uploaded by the user
     *
     * @returns {SupplementaryDocumentResourceResponse[]}
     *   The list of supplementary documents
     */
    getSupplementaryDocuments(): SupplementaryDocumentResourceResponse[];
    /**
     * Returns liveness resources uploaded by the user
     *
     * @returns {LivenessResourceResponse[]}
     *   The list of liveness resources
     */
    getLivenessCapture(): LivenessResourceResponse[];
    /**
     * @returns {ZoomLivenessResourceResponse[]}
     *   The list of Zoom liveness resources
     */
    getZoomLivenessResources(): ZoomLivenessResourceResponse[];
    /**
     * @returns {StaticLivenessResourceResponse[]}
     *   The list of Static liveness resources
     */
    getStaticLivenessResources(): StaticLivenessResourceResponse[];
    /**
     * Returns face resources uploaded by the user
     *
     * @returns {FaceCaptureResourceResponse[]}
     *   The list of face resources
     */
    getFaceCaptureResources(): FaceCaptureResourceResponse[];
}
import IdDocumentResourceResponse = require("./id.document.resource.response");
import SupplementaryDocumentResourceResponse = require("./supplementary.document.resource.response");
import LivenessResourceResponse = require("./liveness.resource.response");
import ZoomLivenessResourceResponse = require("./zoom.liveness.resource.response");
import StaticLivenessResourceResponse = require("./static.liveness.resource.response");
import FaceCaptureResourceResponse = require("./face.capture.resource.response");
