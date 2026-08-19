const ResourceContainer = require('../../../../src/idv_service/session/retrieve/resource.container');
const IdDocumentResourceResponse = require('../../../../src/idv_service/session/retrieve/id.document.resource.response');
const ZoomLivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/zoom.liveness.resource.response');
const LivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/liveness.resource.response');
const SupplementaryDocumentResourceResponse = require('../../../../src/idv_service/session/retrieve/supplementary.document.resource.response');
const StaticLivenessResourceResponse = require('../../../../src/idv_service/session/retrieve/static.liveness.resource.response');
const FaceCaptureResourceResponse = require('../../../../src/idv_service/session/retrieve/face.capture.resource.response');
const FaceCaptureImageResponse = require('../../../../src/idv_service/session/retrieve/face.capture.image.response');
const AuthenticityCheckResponse = require('../../../../src/idv_service/session/retrieve/authenticity.check.response');
const IdDocumentComparisonCheckResponse = require('../../../../src/idv_service/session/retrieve/id.document.comparison.check.response');
const SupplementaryDocumentTextDataCheckResponse = require('../../../../src/idv_service/session/retrieve/supplementary.document.text.data.check.response');

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
        expect(resourceDocuments).toHaveLength(2);
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
        expect(resourceDocuments).toHaveLength(0);
      });
    });
  });

  describe('#getSupplementaryDocuments', () => {
    describe('when supplementary documents are available', () => {
      it('should return supplementary documents', () => {
        const resourceDocuments = resourceContainer.getSupplementaryDocuments();
        expect(resourceDocuments).toHaveLength(2);
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
        expect(resourceDocuments).toHaveLength(0);
      });
    });
  });

  describe('#getLivenessCapture', () => {
    describe('when liveness capture is available', () => {
      it('should return array of liveness resource response', () => {
        const livenessCapture = resourceContainer.getLivenessCapture();
        expect(livenessCapture).toHaveLength(3);
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
        expect(livenessCapture).toHaveLength(0);
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

  describe('#filterForCheck', () => {
    const idDocumentResource = '79d333b7-7cee-45e1-a942-5e7b2b5d60b9';
    const supplementaryDocumentResource = '80032d85-28c2-4e7c-a4cd-b16b47e348ee';

    const resources = {
      id_documents: [
        {
          id: idDocumentResource,
          document_type: 'DRIVING_LICENCE',
          issuing_country: 'GBR',
          pages: [],
        },
        {
          id: '5e7b2b5d-3ccc-t8e9-a942-b16b47e360b9',
          document_type: 'PASSPORT',
          issuing_country: 'GBR',
          pages: [],
        },
      ],
      supplementary_documents: [
        {
          id: supplementaryDocumentResource,
          document_type: 'PHONE_BILL',
          issuing_country: 'GBR',
          pages: [],
        },
      ],
      liveness_capture: [],
    };

    const authenticityCheckResponse = new AuthenticityCheckResponse({
      type: 'ID_DOCUMENT_AUTHENTICITY',
      id: 'caa7dd4b-9854-4852-b22a-2e43c0af2e71',
      state: 'DONE',
      resources_used: [idDocumentResource],
      generated_media: [],
      report: {
        recommendation: {
          value: 'APPROVE',
        },
        breakdown: [],
      },
      created: '2020-10-06T16:31:24Z',
      last_updated: '2020-10-06T16:32:59Z',
    });
    const idDocumentComparisonCheckResponse = new IdDocumentComparisonCheckResponse({
      type: 'ID_DOCUMENT_COMPARISON',
      id: '2e8abd68-e083-462e-b31d-70f2872afc71',
      state: 'DONE',
      resources_used: [
        supplementaryDocumentResource,
        idDocumentResource,
      ],
      generated_media: [],
      report: {
        recommendation: {
          value: 'APPROVE',
        },
        breakdown: [],
      },
      created: '2020-10-06T16:31:24Z',
      last_updated: '2020-10-06T16:35:36Z',
    });
    const supplementaryDocumentTextDataCheckResponse = new SupplementaryDocumentTextDataCheckResponse({
      type: 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK',
      id: '9a4275da-77f6-4034-a9d1-38c3fdf3b29c',
      state: 'DONE',
      resources_used: [supplementaryDocumentResource],
      generated_media: [
        {
          id: '634f40e8-eb15-4eb2-aa55-40d814e9131b',
          type: 'JSON',
        },
      ],
      report: {
        recommendation: {
          value: 'APPROVE',
        },
        breakdown: [],
      },
      created: '2020-10-06T16:31:24Z',
      last_updated: '2020-10-06T16:35:35Z',
    });

    beforeEach(() => {
      resourceContainer = new ResourceContainer(resources);
    });

    it('should return new resource container with only the resources related to the check', () => {
      const r1 = resourceContainer.filterForCheck(authenticityCheckResponse);
      expect(r1.getIdDocuments()).toHaveLength(1);
      expect(r1.getSupplementaryDocuments()).toHaveLength(0);
      expect(r1.getLivenessCapture()).toHaveLength(0);
      expect(r1.getShareCodeResources()).toHaveLength(0);
      expect(r1.getIdDocuments()[0].getId()).toBe(idDocumentResource);

      const r2 = resourceContainer.filterForCheck(idDocumentComparisonCheckResponse);
      expect(r2.getIdDocuments()).toHaveLength(1);
      expect(r2.getSupplementaryDocuments()).toHaveLength(1);
      expect(r2.getLivenessCapture()).toHaveLength(0);
      expect(r2.getShareCodeResources()).toHaveLength(0);
      expect(r2.getIdDocuments()[0].getId()).toBe(idDocumentResource);
      expect(r2.getSupplementaryDocuments()[0].getId()).toBe(supplementaryDocumentResource);

      const r3 = resourceContainer.filterForCheck(supplementaryDocumentTextDataCheckResponse);
      expect(r3.getIdDocuments()).toHaveLength(0);
      expect(r3.getSupplementaryDocuments()).toHaveLength(1);
      expect(r3.getLivenessCapture()).toHaveLength(0);
      expect(r3.getShareCodeResources()).toHaveLength(0);
      expect(r3.getSupplementaryDocuments()[0].getId()).toBe(supplementaryDocumentResource);
    });
  });
});
