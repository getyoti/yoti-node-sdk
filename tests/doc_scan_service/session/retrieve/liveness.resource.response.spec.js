const LivenessResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/liveness.resource.response');
const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');
const TextExtractionTaskResponse = require('../../../../src/doc_scan_service/session/retrieve/text.extraction.task.response');

describe('LivenessResourceResponse', () => {
  let resourceResponse;

  beforeEach(() => {
    resourceResponse = new LivenessResourceResponse({
      liveness_type: 'some-liveness-type',
      id: 'some-id',
      tasks: [
        {
          type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
        },
        {
          type: 'SOME_UNKNOWN_TYPE',
        },
      ],
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(resourceResponse.getId()).toBe('some-id');
    });
  });

  describe('#getType', () => {
    it('should return type', () => {
      expect(resourceResponse.getLivenessType()).toBe('some-liveness-type');
    });
  });

  describe('#getTasks', () => {
    it('should return a list of tasks', () => {
      const tasks = resourceResponse.getTasks();

      expect(tasks.length).toBe(2);

      tasks.forEach((task) => {
        expect(task).toBeInstanceOf(TaskResponse);
      });

      expect(tasks[0]).toBeInstanceOf(TextExtractionTaskResponse);
    });
  });
});
