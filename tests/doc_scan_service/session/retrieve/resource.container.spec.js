const ResourceContainer = require('../../../../src/doc_scan_service/session/retrieve/resource.container');
const IdDocumentResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/id.document.resource.response');
const ZoomLivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/zoom.liveness.resource.response');
const LivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/liveness.resource.response');
const SupplementaryDocumentResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/supplementary.document.resource.response');

const ZOOM = 'ZOOM';
const SOME_UNKNOWN_LIVENESS_TYPE = 'SOME_UNKNOWN_LIVENESS_TYPE';

describe('ResourceContainer', () => {
  let resourceContainer;

  beforeEach(() => {
    resourceContainer = new ResourceContainer({
      id_documents: [
        {},
        {},
      ],
      supplementary_documents: [
        {},
        {},
      ],
      liveness_capture: [
        {
          liveness_type: ZOOM,
        },
        {
          liveness_type: SOME_UNKNOWN_LIVENESS_TYPE,
        },
      ],
    });
  });

  describe('#getIdDocuments', () => {
    describe('when ID documents are available', () => {
      it('should return ID documents', () => {
        const resourceDocuments = resourceContainer.getIdDocuments();
        expect(resourceDocuments.length).toBe(2);
        resourceDocuments.forEach((resourceDocument) => {
          expect(resourceDocument).toBeInstanceOf(IdDocumentResourceResponse);
        });
      });
    });
    describe('when ID documents are not available', () => {
      it('should return empty array', () => {
        resourceContainer = new ResourceContainer({});
        const resourceDocuments = resourceContainer.getIdDocuments();
        expect(resourceDocuments).toBeInstanceOf(Array);
        expect(resourceDocuments.length).toBe(0);
      });
    });
  });

  describe('#getSupplementaryDocuments', () => {
    describe('when supplementary documents are available', () => {
      it('should return supplementary documents', () => {
        const resourceDocuments = resourceContainer.getSupplementaryDocuments();
        expect(resourceDocuments.length).toBe(2);
        resourceDocuments.forEach((resourceDocument) => {
          expect(resourceDocument).toBeInstanceOf(SupplementaryDocumentResourceResponse);
        });
      });
    });
    describe('when supplementary documents are not available', () => {
      it('should return empty array', () => {
        resourceContainer = new ResourceContainer({});
        const resourceDocuments = resourceContainer.getSupplementaryDocuments();
        expect(resourceDocuments).toBeInstanceOf(Array);
        expect(resourceDocuments.length).toBe(0);
      });
    });
  });

  describe('#getLivenessCapture', () => {
    describe('when liveness capture is available', () => {
      it('should return array of liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture.length).toBe(2);
        livenessCapture.forEach((item) => {
          expect(item).toBeInstanceOf(LivenessResourceResponse);
        });
      });

      it('should return zoom liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture[0]).toBeInstanceOf(ZoomLivenessResourceResponse);
        expect(livenessCapture[0].getLivenessType()).toBe(ZOOM);
      });

      it('should return unknown liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture[1]).toBeInstanceOf(LivenessResourceResponse);
        expect(livenessCapture[1].getLivenessType()).toBe(SOME_UNKNOWN_LIVENESS_TYPE);
      });
    });
    describe('when liveness capture is not available', () => {
      it('should return empty array', () => {
        resourceContainer = new ResourceContainer({});
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture).toBeInstanceOf(Array);
        expect(livenessCapture.length).toBe(0);
      });
    });
  });

  describe('#getZoomLivenessResources', () => {
    it('should return array of ZoomLivenessResourceResponse', () => {
      const livenessCapture = resourceContainer.getZoomLivenessResources();
      livenessCapture.forEach((item) => {
        expect(item).toBeInstanceOf(ZoomLivenessResourceResponse);
        expect(item.getLivenessType()).toBe(ZOOM);
      });
    });
  });
});
