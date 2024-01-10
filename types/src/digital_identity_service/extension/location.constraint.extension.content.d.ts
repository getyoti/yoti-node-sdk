export = LocationConstraintContent;
declare class LocationConstraintContent {
    constructor(latitude: any, longitude: any, radius: any, maxUncertainty: any);
    /** @private */
    private expectedDeviceLocation;
    /**
     * @returns {DeviceLocation}
     */
    getExpectedDeviceLocation(): DeviceLocation;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        expected_device_location: DeviceLocation;
    };
}
import DeviceLocation = require("./device.location");
