'use strict';

const TaskResponse = require('./task.response');
const Validation = require('../../../yoti_common/validation');

class ResourceResponse {
  constructor(resource) {
    Validation.isString(resource.id, 'id', true);
    this.id = resource.id;

    if (resource.tasks) {
      this.tasks = resource.tasks.map(task => new TaskResponse(task));
    }
  }

  getTasks() {
    return this.tasks;
  }

  getId() {
    return this.id;
  }
}

module.exports = ResourceResponse;
