
const ResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/resource.response');
const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');

describe('ResourceResponse', () => {
  let resourceResponse;

  beforeEach(() => {
    resourceResponse = new ResourceResponse({
      id: 'some-id',
      tasks: [
        {},
        {},
      ],
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(resourceResponse.getId()).toBe('some-id');
    });
  });

  describe('#getTasks', () => {
    it('should return a list of tasks', () => {
      const tasks = resourceResponse.getTasks();
      expect(tasks.length).toBe(2);
      tasks.forEach((task) => {
        expect(task).toBeInstanceOf(TaskResponse);
      });
    });
  });
});
