'use strict';

const DocumentResourceResponse = require('./document.resource.response');
const ZoomLivenessResourceResponse = require('./zoom.liveness.resource.response');
const LivenessResourceResponse = require('./liveness.resource.response');
const DocScanConstants = require('../../doc.scan.constants');
const Validation = require('../../../yoti_common/validation');

class ResourceContainer {
  constructor(resources) {
    if (resources.id_documents) {
      Validation.isArray(resources.id_documents, 'id_documents');
      this.idDocuments = resources
        .id_documents
        .map(resource => new DocumentResourceResponse(resource));
    }

    if (resources.liveness_capture) {
      Validation.isArray(resources.liveness_capture, 'liveness_capture');
      this.livenessCapture = resources
        .liveness_capture
        .map((resource) => {
          switch (resource.liveness_type) {
            case DocScanConstants.ZOOM:
              return new ZoomLivenessResourceResponse(resource);
            default:
              return new LivenessResourceResponse(resource);
          }
        })
        .filter(resource => resource !== null);
    }
  }

  /**
   * Returns ID documents that were uploaded by the user
   *
   * @returns {DocumentResourceResponse[]}
   *   The list of documents
   */
  getIdDocuments() {
    return this.idDocuments;
  }

  /**
   * Returns liveness resources uploaded by the user
   *
   * @returns {LivenessResourceResponse[]}
   *   The list of liveness resources
   */
  getLivenessCapture() {
    return this.livenessCapture || [];
  }

  /**
   * @returns {ZoomLivenessResourceResponse[]}
   *   The list of Zoom liveness resources
   */
  getZoomLivenessResources() {
    return this
      .getLivenessCapture()
      .filter(resource => resource instanceof ZoomLivenessResourceResponse);
  }
}

module.exports = ResourceContainer;
