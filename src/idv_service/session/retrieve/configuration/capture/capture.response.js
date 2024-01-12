'use strict';

const Validation = require('../../../../../yoti_common/validation');
const RequiredDocumentResourceResponse = require('./document/required.document.resource.response');
const RequiredIdDocumentResourceResponse = require('./document/required.id.document.resource.response');
const RequiredSupplementaryDocumentResourceResponse = require('./document/required.supplementary.document.resource.response');
const RequiredFaceCaptureResourceResponse = require('./face_capture/required.face.capture.resource.response');
const RequiredLivenessResourceResponse = require('./liveness/required.liveness.resource.response');
const RequiredZoomLivenessResourceResponse = require('./liveness/required.zoom.liveness.resource.response');
const UnknownRequiredResourceResponse = require('./unknown.required.resource.response');
const IDVConstants = require('../../../../idv.constants');

/**
 * @param {object} requiredResource
 *
 * @typedef {import('./required.resource.response')} RequiredResourceResponse
 *
 * @return {RequiredResourceResponse}
 */
function createRequiredResourcesArray(requiredResource) {
  switch (requiredResource.type) {
    case IDVConstants.ID_DOCUMENT:
      return new RequiredIdDocumentResourceResponse(requiredResource);
    case IDVConstants.SUPPLEMENTARY_DOCUMENT:
      return new RequiredSupplementaryDocumentResourceResponse(requiredResource);
    case IDVConstants.LIVENESS:
      return new RequiredZoomLivenessResourceResponse(requiredResource);
    case IDVConstants.FACE_CAPTURE:
      return new RequiredFaceCaptureResourceResponse(requiredResource);
    default:
      return new UnknownRequiredResourceResponse(requiredResource);
  }
}

const filterByClass = (array, filterClass) => array.filter((item) => item instanceof filterClass);

class CaptureResponse {
  /**
   * @param {object} capture
   */
  constructor(capture) {
    Validation.isString(capture.biometric_consent, 'biometric_consent');
    /** @private */
    this.biometricConsent = capture.biometric_consent;

    if (capture.required_resources) {
      Validation.isArray(capture.required_resources, 'required_resources');
      /** @private */
      this.requiredResources = capture.required_resources.map(
        (requiredResource) => createRequiredResourcesArray(requiredResource)
      );
    }
  }

  /**
   * Returns a String enum of the state of biometric consent
   *
   * return if biometric consent needs to be captured
   *
   * @return {string | null}
   */
  getBiometricConsent() {
    return this.biometricConsent;
  }

  /**
   * Returns a list of required resources, in order to satisfy the sessions
   * requirements
   *
   * return the list of required resources
   *
   * @return {RequiredResourceResponse[]}
   */
  getRequiredResources() {
    return this.requiredResources;
  }

  /**
   * Returns a list of all the document resource
   * requirements (including ID and supplementary documents)
   * @return {RequiredDocumentResourceResponse[]}
   */
  getDocumentResourceRequirements() {
    return filterByClass(this.requiredResources, RequiredDocumentResourceResponse);
  }

  /**
   * Returns a list of all the ID document resource requirements
   *
   * @return {RequiredIdDocumentResourceResponse[]}
   */
  getIdDocumentResourceRequirements() {
    return filterByClass(this.requiredResources, RequiredIdDocumentResourceResponse);
  }

  /**
   * Returns a list of all the supplementary document resource requirements
   *
   * @return {RequiredSupplementaryDocumentResourceResponse[]}
   */
  getSupplementaryResourceRequirements() {
    return filterByClass(this.requiredResources, RequiredSupplementaryDocumentResourceResponse);
  }

  /**
   * Returns a list of all the liveness resource requirements
   *
   * @return {RequiredLivenessResourceResponse[]}
   */
  getLivenessResourceRequirements() {
    return filterByClass(this.requiredResources, RequiredLivenessResourceResponse);
  }

  /**
   * Returns a list of all the zoom liveness resource requirements
   *
   * @return {RequiredZoomLivenessResourceResponse[]}
   */
  getZoomLivenessResourceRequirements() {
    return filterByClass(this.requiredResources, RequiredZoomLivenessResourceResponse);
  }

  /**
   * Returns a list of all the Face Capture resource requirements
   *
   * @return {RequiredFaceCaptureResourceResponse[]}
   */
  getFaceCaptureResourceRequirements() {
    return filterByClass(this.requiredResources, RequiredFaceCaptureResourceResponse);
  }
}

module.exports = CaptureResponse;
