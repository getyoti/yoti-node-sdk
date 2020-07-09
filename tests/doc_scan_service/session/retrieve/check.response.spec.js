const CheckResponse = require('../../../../src/doc_scan_service/session/retrieve/check.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const ReportResponse = require('../../../../src/doc_scan_service/session/retrieve/report.response');

describe('CheckResponse', () => {
  let checkResponse;

  beforeEach(() => {
    checkResponse = new CheckResponse({
      type: 'some-type',
      id: 'some-id',
      state: 'some-state',
      created: '2006-01-02T22:04:05.123Z',
      last_updated: '2006-02-02T22:04:05.123Z',
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

  describe('#getType', () => {
    it('should return type', () => {
      expect(checkResponse.getType()).toBe('some-type');
    });
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
    it('should return created', () => {
      expect(checkResponse.getCreated().getMicrosecondTimestamp())
        .toBe('2006-01-02T22:04:05.123000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(checkResponse.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2006-02-02T22:04:05.123000Z');
    });
  });

  describe('#getResourcesUsed', () => {
    describe('when resources used are available', () => {
      it('should return list of resources', () => {
        const resources = checkResponse.getResourcesUsed();
        expect(resources.length).toBe(2);
        expect(resources[0]).toBe('some-resource');
        expect(resources[1]).toBe('some-other-resource');
      });
    });
    describe('when resources used are not available', () => {
      it('should return empty array', () => {
        checkResponse = new CheckResponse({});
        const resources = checkResponse.getResourcesUsed();
        expect(resources).toBeInstanceOf(Array);
        expect(resources.length).toBe(0);
      });
    });
  });

  describe('#getGeneratedMedia', () => {
    describe('when generated media is available', () => {
      it('should return list of generated media', () => {
        const media = checkResponse.getGeneratedMedia();
        expect(media.length).toBe(2);
        media.forEach((mediaItem) => {
          expect(mediaItem).toBeInstanceOf(GeneratedMedia);
        });
      });
    });
    describe('when generated media is not available', () => {
      it('should return empty array', () => {
        checkResponse = new CheckResponse({});
        const media = checkResponse.getGeneratedMedia();
        expect(media).toBeInstanceOf(Array);
        expect(media.length).toBe(0);
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
