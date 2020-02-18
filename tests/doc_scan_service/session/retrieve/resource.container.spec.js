const ResourceContainer = require('../../../../src/doc_scan_service/session/retrieve/resource.container');
const DocumentResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/document.resource.response');
const ZoomLivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/zoom.liveness.resource.response');
const LivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/liveness.resource.response');

describe('ResourceContainer', () => {
  let resourceContainer;

  beforeEach(() => {
    resourceContainer = new ResourceContainer({
      id_documents: [
        {},
        {},
      ],
      liveness_capture: [
        {},
        {
          liveness_type: 'ZOOM',
        },
      ],
    });
  });

  describe('#getIdDocuments', () => {
    it('should return ID documents', () => {
      const resourceDocuments = resourceContainer.getIdDocuments();
      expect(resourceDocuments.length).toBe(2);
      resourceDocuments.forEach((resourceDocument) => {
        expect(resourceDocument).toBeInstanceOf(DocumentResourceResponse);
      });
    });
  });

  describe('#getLivenessCapture', () => {
    it('should return array of liveness resource response', () => {
      const livenessCapture = resourceContainer.getLivenessCapture();
      livenessCapture.forEach((item) => {
        expect(item).toBeInstanceOf(LivenessResourceResponse);
      });
    });

    it('should return zoom liveness resource response', () => {
      const livenessCapture = resourceContainer.getLivenessCapture();
      expect(livenessCapture[0]).toBeInstanceOf(ZoomLivenessResourceResponse);
    });

    it('should skip unknown capture items', () => {
      const livenessCapture = resourceContainer.getLivenessCapture();
      expect(livenessCapture.length).toBe(1);
    });
  });
});
