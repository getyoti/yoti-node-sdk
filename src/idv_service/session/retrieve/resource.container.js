'use strict';

const IdDocumentResourceResponse = require('./id.document.resource.response');
const ZoomLivenessResourceResponse = require('./zoom.liveness.resource.response');
const StaticLivenessResourceResponse = require('./static.liveness.resource.response');
const LivenessResourceResponse = require('./liveness.resource.response');
const FaceCaptureResourceResponse = require('./face.capture.resource.response');
const IDVConstants = require('../../idv.constants');
const Validation = require('../../../yoti_common/validation');
const SupplementaryDocumentResourceResponse = require('./supplementary.document.resource.response');

class ResourceContainer {
  constructor(resources) {
    if (resources.id_documents) {
      Validation.isArray(resources.id_documents, 'id_documents');
      /** @private */
      this.idDocuments = resources
        .id_documents
        .map((resource) => new IdDocumentResourceResponse(resource));
    } else {
      /** @private */
      this.idDocuments = [];
    }

    if (resources.supplementary_documents) {
      Validation.isArray(resources.supplementary_documents, 'supplementary_documents');
      /** @private */
      this.supplementaryDocuments = resources
        .supplementary_documents
        .map((resource) => new SupplementaryDocumentResourceResponse(resource));
    } else {
      /** @private */
      this.supplementaryDocuments = [];
    }

    if (resources.liveness_capture) {
      Validation.isArray(resources.liveness_capture, 'liveness_capture');
      /** @private */
      this.livenessCapture = resources
        .liveness_capture
        .map((resource) => {
          switch (resource.liveness_type) {
            case IDVConstants.ZOOM:
              return new ZoomLivenessResourceResponse(resource);
            case IDVConstants.STATIC:
              return new StaticLivenessResourceResponse(resource);
            default:
              return new LivenessResourceResponse(resource);
          }
        });
    } else {
      /** @private */
      this.livenessCapture = [];
    }

    if (resources.face_capture) {
      Validation.isArray(resources.face_capture, 'face_capture');

      /** @private */
      this.faceCapture = resources.face_capture.map(
        (resource) => new FaceCaptureResourceResponse(resource)
      );
    } else {
      /** @private */
      this.faceCapture = [];
    }
  }

  /**
   * Returns ID documents that were uploaded by the user
   *
   * @returns {IdDocumentResourceResponse[]}
   *   The list of ID documents
   */
  getIdDocuments() {
    return this.idDocuments;
  }

  /**
   * Returns supplementary documents that were uploaded by the user
   *
   * @returns {SupplementaryDocumentResourceResponse[]}
   *   The list of supplementary documents
   */
  getSupplementaryDocuments() {
    return this.supplementaryDocuments;
  }

  /**
   * Returns liveness resources uploaded by the user
   *
   * @returns {LivenessResourceResponse[]}
   *   The list of liveness resources
   */
  getLivenessCapture() {
    return this.livenessCapture;
  }

  /**
   * @returns {ZoomLivenessResourceResponse[]}
   *   The list of Zoom liveness resources
   */
  getZoomLivenessResources() {
    return /** @type ZoomLivenessResourceResponse[] */ (this
      .getLivenessCapture()
      .filter((resource) => resource instanceof ZoomLivenessResourceResponse));
  }

  /**
   * @returns {StaticLivenessResourceResponse[]}
   *   The list of Static liveness resources
   */
  getStaticLivenessResources() {
    return /** @type StaticLivenessResourceResponse[] */ (this
      .getLivenessCapture()
      .filter((resource) => resource instanceof StaticLivenessResourceResponse));
  }

  /**
   * Returns face resources uploaded by the user
   *
   * @returns {FaceCaptureResourceResponse[]}
   *   The list of face resources
   */
  getFaceCaptureResources() {
    return this.faceCapture;
  }
}

module.exports = ResourceContainer;
