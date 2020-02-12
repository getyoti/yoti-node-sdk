
const AuthenticityCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/authenticity.check.response');
const CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/check.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const ReportResponse = require('../../../../src/doc_scan_service/session/retrieve/report.response');

describe('AuthenticityCheckResponse', () => {
  let checkResponse;

  beforeEach(() => {
    checkResponse = new AuthenticityCheckResponse({
      id: 'some-id',
      state: 'some-state',
      created: 'some-created',
      last_updated: 'some-updated',
      resources_used: [
        'some-resource',
        'some-other-resource',
      ],
      generated_media: [
        {},
        {},
      ],
      report: {},
    });
  });

  it('should be instance of CheckResponse', () => {
    expect(checkResponse).toBeInstanceOf(CheckResponse);
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(checkResponse.getId()).toBe('some-id');
    });
  });

  describe('#getState', () => {
    it('should return state', () => {
      expect(checkResponse.getState()).toBe('some-state');
    });
  });

  describe('#getCreated', () => {
    it('should return create', () => {
      expect(checkResponse.getCreated()).toBe('some-created');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(checkResponse.getLastUpdated()).toBe('some-updated');
    });
  });

  describe('#getResourcesUsed', () => {
    it('should return list of resources', () => {
      const resources = checkResponse.getResourcesUsed();
      expect(resources.length).toBe(2);
      expect(resources[0]).toBe('some-resource');
      expect(resources[1]).toBe('some-other-resource');
    });
  });

  describe('#getGeneratedMedia', () => {
    it('should return list of generated media', () => {
      const media = checkResponse.getGeneratedMedia();
      expect(media.length).toBe(2);
      media.forEach((mediaItem) => {
        expect(mediaItem).toBeInstanceOf(GeneratedMedia);
      });
    });
  });

  describe('#getReport', () => {
    it('should return report', () => {
      const report = checkResponse.getReport();
      expect(report).toBeInstanceOf(ReportResponse);
    });
  });
});
