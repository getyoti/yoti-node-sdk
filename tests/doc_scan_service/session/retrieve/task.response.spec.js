
const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');
const GeneratedCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.check.response');
const GeneratedTextDataCheckResponse = require('../../../../src/doc_scan_service/session/retrieve/generated.text.data.check.response');
const GeneratedMedia = require('../../../../src/doc_scan_service/session/retrieve/generated.media');

describe('TaskResponse', () => {
  let taskResponse;

  beforeEach(() => {
    taskResponse = new TaskResponse({
      id: 'some-id',
      state: 'some-state',
      created: 'some-created',
      last_updated: 'some-updated',
      generated_checks: [
        {
          type: 'ID_DOCUMENT_TEXT_DATA_CHECK',
          id: 'some-id',
        },
        {
          type: 'SOME_UNKNOWN_TYPE',
        },
      ],
      generated_media: [
        {},
        {},
      ],
    });
  });

  describe('#getId', () => {
    it('should be instance of TaskResponse', () => {
      expect(taskResponse).toBeInstanceOf(TaskResponse);
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
      expect(taskResponse.getCreated()).toBe('some-created');
    });
  });

  describe('#getLastUpdated', () => {
    it('should return last updated', () => {
      expect(taskResponse.getLastUpdated()).toBe('some-updated');
    });
  });

  describe('#getGeneratedChecks', () => {
    it('should return list of generated checks', () => {
      const checks = taskResponse.getGeneratedChecks();

      expect(checks.length).toBe(2);

      checks.forEach((check) => {
        expect(check).toBeInstanceOf(GeneratedCheckResponse);
      });

      expect(checks[0]).toBeInstanceOf(GeneratedTextDataCheckResponse);
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
    it('should return generated media', () => {
      const media = taskResponse.getGeneratedMedia();
      expect(media.length).toBe(2);
      media.forEach((mediaItem) => {
        expect(mediaItem).toBeInstanceOf(GeneratedMedia);
      });
    });
  });
});
