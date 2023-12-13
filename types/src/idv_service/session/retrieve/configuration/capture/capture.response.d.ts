export = CaptureResponse;
declare class CaptureResponse {
    /**
     * @param {object} capture
     */
    constructor(capture: object);
    biometricConsent: any;
    requiredResources: any;
    /**
     * Returns a String enum of the state of biometric consent
     *
     * return if biometric consent needs to be captured
     *
     * @return {string | null}
     */
    getBiometricConsent(): string | null;
    /**
     * Returns a list of required resources, in order to satisfy the sessions
     * requirements
     *
     * return the list of required resources
     *
     * @return {RequiredResourceResponse[]}
     */
    getRequiredResources(): RequiredResourceResponse[];
    /**
     * Returns a list of all the document resource
     * requirements (including ID and supplementary documents)
     * @return {RequiredDocumentResourceResponse[]}
     */
    getDocumentResourceRequirements(): RequiredDocumentResourceResponse[];
    /**
     * Returns a list of all the ID document resource requirements
     *
     * @return {RequiredIdDocumentResourceResponse[]}
     */
    getIdDocumentResourceRequirements(): RequiredIdDocumentResourceResponse[];
    /**
     * Returns a list of all the supplementary document resource requirements
     *
     * @return {RequiredSupplementaryDocumentResourceResponse[]}
     */
    getSupplementaryResourceRequirements(): RequiredSupplementaryDocumentResourceResponse[];
    /**
     * Returns a list of all the liveness resource requirements
     *
     * @return {RequiredLivenessResourceResponse[]}
     */
    getLivenessResourceRequirements(): RequiredLivenessResourceResponse[];
    /**
     * Returns a list of all the zoom liveness resource requirements
     *
     * @return {RequiredZoomLivenessResourceResponse[]}
     */
    getZoomLivenessResourceRequirements(): RequiredZoomLivenessResourceResponse[];
    /**
     * Returns a list of all the Face Capture resource requirements
     *
     * @return {RequiredFaceCaptureResourceResponse[]}
     */
    getFaceCaptureResourceRequirements(): RequiredFaceCaptureResourceResponse[];
}
import RequiredDocumentResourceResponse = require("./document/required.document.resource.response");
import RequiredIdDocumentResourceResponse = require("./document/required.id.document.resource.response");
import RequiredSupplementaryDocumentResourceResponse = require("./document/required.supplementary.document.resource.response");
import RequiredLivenessResourceResponse = require("./liveness/required.liveness.resource.response");
import RequiredZoomLivenessResourceResponse = require("./liveness/required.zoom.liveness.resource.response");
import RequiredFaceCaptureResourceResponse = require("./face_capture/required.face.capture.resource.response");
