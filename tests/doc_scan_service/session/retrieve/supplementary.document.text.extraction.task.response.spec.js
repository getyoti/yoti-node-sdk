const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const GeneratedSupplementaryDocumentTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.supplementary.document.text.data.check.response');
const SupplementaryDocumentTextExtractionTaskResponse = require('../../../../src/doc_scan_service/session/retrieve/supplementary.document.text.extraction.task.response');
const GeneratedCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.check.response');

describe('SupplementaryDocumentTextExtractionTaskResponse', () => {
  let taskResponse;

  beforeEach(() => {
    taskResponse = new SupplementaryDocumentTextExtractionTaskResponse({
      type: 'some-type',
      id: 'some-id',
      state: 'some-state',
      created: '2006-01-02T22:04:05.123Z',
      last_updated: '2006-02-02T22:04:05.123Z',
      generated_checks: [
        {
          type: 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK',
          id: 'some-id',
        },
      ],
      generated_media: [
        {},
        {},
      ],
    });
  });

  it('should be instance of TaskResponse', () => {
    expect(taskResponse).toBeInstanceOf(TaskResponse);
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(taskResponse.getId()).toBe('some-id');
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(taskResponse.getType()).toBe('some-type');
    });
  });

  describe('#getState', () => {
    it('should return state', () => {
      expect(taskResponse.getState()).toBe('some-state');
    });
  });

  describe('#getCreated', () => {
    it('should return created', () => {
      expect(taskResponse.getCreated().getMicrosecondTimestamp())
        .toBe('2006-01-02T22:04:05.123000Z');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(taskResponse.getLastUpdated().getMicrosecondTimestamp())
        .toBe('2006-02-02T22:04:05.123000Z');
    });
  });

  describe('#getGeneratedChecks', () => {
    it('should return generated checks', () => {
      const checks = taskResponse.getGeneratedChecks();
      checks.forEach((check) => {
        expect(check).toBeInstanceOf(GeneratedCheckResponse);
      });
    });
  });

  describe('#getGeneratedTextDataChecks', () => {
    it('should return generated text data checks', () => {
      const checks = taskResponse.getGeneratedTextDataChecks();
      expect(checks.length).toBe(1);
      checks.forEach((check) => {
        expect(check).toBeInstanceOf(GeneratedSupplementaryDocumentTextDataCheckResponse);
      });
    });
  });

  describe('#getGeneratedMedia', () => {
    it('should return generated media', () => {
      const media = taskResponse.getGeneratedMedia();
      expect(media.length).toBe(2);
      media.forEach((mediaItem) => {
        expect(mediaItem).toBeInstanceOf(GeneratedMedia);
      });
    });
  });
});
