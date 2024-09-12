export = TrackedDevicesResponse;
declare class TrackedDevicesResponse {
    /**
     * @param {{}[]} response
     */
    constructor(response: {}[]);
    /** @private */
    private deviceEvents;
    /**
     * Returns the list of tracked device events.
     *
     * @returns {TrackedDeviceEventResponse[]}
     */
    getDeviceEvents(): TrackedDeviceEventResponse[];
}
import TrackedDeviceEventResponse = require("./tracked.device.event.response");
