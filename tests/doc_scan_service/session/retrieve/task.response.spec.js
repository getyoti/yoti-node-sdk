const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');
const GeneratedCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.check.response');
const GeneratedTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.text.data.check.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');
const GeneratedSupplementaryDocumentTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.supplementary.document.text.data.check.response');

const ID_DOCUMENT_TEXT_DATA_CHECK = 'ID_DOCUMENT_TEXT_DATA_CHECK';
const SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK = 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK';
const SOME_UNKNOWN_TYPE = 'SOME_UNKNOWN_TYPE';

describe('TaskResponse', () => {
  let taskResponse;

  beforeEach(() => {
    taskResponse = new TaskResponse({
      type: 'some-type',
      id: 'some-id',
      state: 'some-state',
      created: '2006-01-02T22:04:05.123Z',
      last_updated: '2006-02-02T22:04:05.123Z',
      generated_checks: [
        {
          type: ID_DOCUMENT_TEXT_DATA_CHECK,
          id: 'some-id',
        },
        {
          type: SOME_UNKNOWN_TYPE,
        },
        {
          type: SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK,
          id: 'some-id',
        },
      ],
      generated_media: [
        {},
        {},
      ],
    });
  });

  describe('#getType', () => {
    it('should return Type', () => {
      expect(taskResponse.getType()).toBe('some-type');
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(taskResponse.getId()).toBe('some-id');
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
    describe('when checks are available', () => {
      it('should return list of generated checks', () => {
        const checks = taskResponse.getGeneratedChecks();

        expect(checks.length).toBe(3);

        expect(checks[0]).toBeInstanceOf(GeneratedTextDataCheckResponse);
        expect(checks[0].getType()).toBe(ID_DOCUMENT_TEXT_DATA_CHECK);

        expect(checks[1]).toBeInstanceOf(GeneratedCheckResponse);
        expect(checks[1].getType()).toBe(SOME_UNKNOWN_TYPE);

        expect(checks[2]).toBeInstanceOf(GeneratedSupplementaryDocumentTextDataCheckResponse);
        expect(checks[2].getType()).toBe(SUPPLEMENTARY_DOCUMENT_TEXT_DATA_CHECK);
      });
    });
    describe('when checks are not available', () => {
      it('should return empty array', () => {
        taskResponse = new TaskResponse({});
        const checks = taskResponse.getGeneratedChecks();
        expect(checks).toBeInstanceOf(Array);
        expect(checks.length).toBe(0);
      });
    });
  });

  describe('#getGeneratedTextDataChecks', () => {
    it('should return list of GeneratedTextDataCheckResponse', () => {
      const checks = taskResponse.getGeneratedTextDataChecks();
      checks.forEach((check) => {
        expect(check).toBeInstanceOf(GeneratedTextDataCheckResponse);
      });
    });
  });

  describe('#getGeneratedMedia', () => {
    describe('when generated media is available', () => {
      it('should return generated media', () => {
        const media = taskResponse.getGeneratedMedia();
        expect(media.length).toBe(2);
        media.forEach((mediaItem) => {
          expect(mediaItem).toBeInstanceOf(GeneratedMedia);
        });
      });
    });
    describe('when generated media is not available', () => {
      it('should return empty array', () => {
        taskResponse = new TaskResponse({});
        const media = taskResponse.getGeneratedMedia();
        expect(media).toBeInstanceOf(Array);
        expect(media.length).toBe(0);
      });
    });
  });
});
