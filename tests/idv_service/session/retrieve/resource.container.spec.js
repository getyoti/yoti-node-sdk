const ResourceContainer = require('../../../../src/idv_service/session/retrieve/resource.container');
const IdDocumentResourceResponse = require('../../../../src/idv_service/session/retrieve/id.document.resource.response');
const ZoomLivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/zoom.liveness.resource.response');
const LivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/liveness.resource.response');
const SupplementaryDocumentResourceResponse = require('../../../../src/idv_service/session/retrieve/supplementary.document.resource.response');
const StaticLivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/static.liveness.resource.response');
const FaceCaptureResourceResponse = require('../../../../src/idv_service/session/retrieve/face.capture.resource.response');
const FaceCaptureImageResponse = require('../../../../src/idv_service/session/retrieve/face.capture.image.response');

const ZOOM = 'ZOOM';
const STATIC = 'STATIC';
const SOME_UNKNOWN_LIVENESS_TYPE = 'SOME_UNKNOWN_LIVENESS_TYPE';
const IMAGE = {
  media: {},
};

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
          liveness_type: STATIC,
        },
        {
          liveness_type: SOME_UNKNOWN_LIVENESS_TYPE,
        },
      ],
      face_capture: [
        {
          image: IMAGE,
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
        expect(livenessCapture.length).toBe(3);
        livenessCapture.forEach((item) => {
          expect(item).toBeInstanceOf(LivenessResourceResponse);
        });
      });

      it('should return zoom liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture[0]).toBeInstanceOf(ZoomLivenessResourceResponse);
        expect(livenessCapture[0].getLivenessType()).toBe(ZOOM);
      });

      it('should return static liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture[1]).toBeInstanceOf(StaticLivenessResourceResponse);
        expect(livenessCapture[1].getLivenessType()).toBe(STATIC);
      });

      it('should return unknown liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture[2]).toBeInstanceOf(LivenessResourceResponse);
        expect(livenessCapture[2].getLivenessType()).toBe(SOME_UNKNOWN_LIVENESS_TYPE);
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

  describe('#getStaticLivenessResources', () => {
    it('should return array of StaticLivenessResourceResponse', () => {
      const livenessCapture = resourceContainer.getStaticLivenessResources();
      livenessCapture.forEach((item) => {
        expect(item).toBeInstanceOf(StaticLivenessResourceResponse);
        expect(item.getLivenessType()).toBe(STATIC);
      });
    });
  });

  describe('#getFaceCapture', () => {
    it('should return array of FaceCaptureResourceResponse', () => {
      const livenessCapture = resourceContainer.getFaceCaptureResources();
      livenessCapture.forEach((item) => {
        const faceCaptureImageResponse = new FaceCaptureImageResponse(IMAGE);

        expect(item).toBeInstanceOf(FaceCaptureResourceResponse);
        expect(item.getImage()).toBeInstanceOf(FaceCaptureImageResponse);
        expect(item.getImage()).toEqual(faceCaptureImageResponse);
      });
    });
  });
});
