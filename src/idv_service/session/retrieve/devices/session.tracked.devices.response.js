'use strict';

const Validation = require('../../../../yoti_common/validation');
const TrackedDeviceEventResponse = require('./tracked.device.event.response');

class TrackedDevicesResponse {
  /**
   * @param {{}[]} response
   */
  constructor(response) {
    Validation.isArray(response, 'tracked devices');
    /** @private */
    this.deviceEvents = response.map((item) => new TrackedDeviceEventResponse(item));
  }

  /**
   * Returns the list of tracked device events.
   *
   * @returns {TrackedDeviceEventResponse[]}
   */
  getDeviceEvents() {
    return this.deviceEvents;
  }
}

module.exports = TrackedDevicesResponse;
