const CaptureResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/capture.response');
const RequiredDocumentResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/document/required.document.resource.response');
const RequiredIdDocumentResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/document/required.id.document.resource.response');
const RequiredSupplementaryDocumentResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/document/required.supplementary.document.resource.response');
const RequiredFaceCaptureResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/face_capture/required.face.capture.resource.response');
const RequiredLivenessResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/liveness/required.liveness.resource.response');
const RequiredZoomLivenessResourceResponse = require('../../../../../../src/idv_service/session/retrieve/configuration/capture/liveness/required.zoom.liveness.resource.response');

describe('CaptureResponse', () => {
  let captureResponse;

  beforeEach(() => {
    captureResponse = new CaptureResponse({
      biometric_consent: '',
      required_resources: [
        {
          type: 'ID_DOCUMENT',
          id: '',
          state: '',
          allowed_capture_methods: 'CAMERA_AND_UPLOAD',
          attempts_remaining: {},
        },
        {
          type: 'SUPPLEMENTARY_DOCUMENT',
          id: '',
          state: '',
          document_types: [
            '',
          ],
          country_codes: [
            '',
          ],
        },
        {
          type: 'LIVENESS',
          id: '',
          liveness_type: 'ZOOM',
          state: '',
        },
        {
          type: 'FACE_CAPTURE',
          id: '',
          state: '',
        },
      ],
    });
  });

  it('should be instance of CaptureResponse', () => {
    expect(captureResponse).toBeInstanceOf(CaptureResponse);
  });

  describe('#getBiometricConsent', () => {
    it('should return biometric consent', () => {
      expect(captureResponse.getBiometricConsent()).toBe('');
    });
  });

  describe('#getRequiredResources', () => {
    it('should return required resources', () => {
      expect(captureResponse.getRequiredResources()).toHaveLength(4);
    });
  });

  describe('#getDocumentResourceRequirements', () => {
    it('should return required document resources', () => {
      expect(captureResponse.getDocumentResourceRequirements()).toHaveLength(2);
      expect(
        captureResponse.getDocumentResourceRequirements()[0]
      ).toBeInstanceOf(RequiredDocumentResourceResponse);
    });
  });

  describe('#getIdDocumentResourceRequirements', () => {
    it('should return required id document resources', () => {
      expect(captureResponse.getIdDocumentResourceRequirements()).toHaveLength(1);
      expect(
        captureResponse.getIdDocumentResourceRequirements()[0]
      ).toBeInstanceOf(RequiredIdDocumentResourceResponse);
    });
  });

  describe('#getSupplementaryResourceRequirements', () => {
    it('should return required supplementary document resources', () => {
      expect(captureResponse.getSupplementaryResourceRequirements()).toHaveLength(1);
      expect(
        captureResponse.getSupplementaryResourceRequirements()[0]
      ).toBeInstanceOf(RequiredSupplementaryDocumentResourceResponse);
    });
  });

  describe('#getLivenessResourceRequirements', () => {
    it('should return required liveness resources', () => {
      expect(captureResponse.getLivenessResourceRequirements()).toHaveLength(1);
      expect(
        captureResponse.getLivenessResourceRequirements()[0]
      ).toBeInstanceOf(RequiredLivenessResourceResponse);
    });
  });

  describe('#getZoomLivenessResourceRequirements', () => {
    it('should return required zoom liveness resources', () => {
      expect(captureResponse.getZoomLivenessResourceRequirements()).toHaveLength(1);
      expect(
        captureResponse.getZoomLivenessResourceRequirements()[0]
      ).toBeInstanceOf(RequiredZoomLivenessResourceResponse);
    });
  });

  describe('#getFaceCaptureResourceRequirements', () => {
    it('should return required face capture resources', () => {
      expect(captureResponse.getFaceCaptureResourceRequirements()).toHaveLength(1);
      expect(
        captureResponse.getFaceCaptureResourceRequirements()[0]
      ).toBeInstanceOf(RequiredFaceCaptureResourceResponse);
    });
  });
});
