const ResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/resource.response');
const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');
const TextExtractionTaskResponse = require('../../../../src/doc_scan_service/session/retrieve/text.extraction.task.response');

const ID_DOCUMENT_TEXT_DATA_EXTRACTION = 'ID_DOCUMENT_TEXT_DATA_EXTRACTION';
const SOME_UNKNOWN_TASK = 'SOME_UNKNOWN_TASK';

describe('ResourceResponse', () => {
  let resourceResponse;

  beforeEach(() => {
    resourceResponse = new ResourceResponse({
      id: 'some-id',
      tasks: [
        {
          type: ID_DOCUMENT_TEXT_DATA_EXTRACTION,
        },
        {
          type: SOME_UNKNOWN_TASK,
        },
      ],
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(resourceResponse.getId()).toBe('some-id');
    });
  });

  describe('#getTasks', () => {
    describe('when tasks are available', () => {
      it('should return a list of tasks', () => {
        const tasks = resourceResponse.getTasks();

        expect(tasks.length).toBe(2);

        tasks.forEach((task) => {
          expect(task).toBeInstanceOf(TaskResponse);
        });

        expect(tasks[0]).toBeInstanceOf(TextExtractionTaskResponse);
        expect(tasks[0].getType()).toBe(ID_DOCUMENT_TEXT_DATA_EXTRACTION);

        expect(tasks[1].getType()).toBe(SOME_UNKNOWN_TASK);
      });
    });
    describe('when tasks are not available', () => {
      it('should return empty array', () => {
        resourceResponse = new ResourceResponse({});
        const tasks = resourceResponse.getTasks();
        expect(tasks).toBeInstanceOf(Array);
        expect(tasks.length).toBe(0);
      });
    });
  });
});
