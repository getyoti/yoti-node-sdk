export = LocationConstraintExtensionBuilder;
declare class LocationConstraintExtensionBuilder {
    /**
     * Allows you to specify the Latitude of the user's expected location
     *
     * @param {Number} latitude
     *
     * @returns {LocationConstraintExtensionBuilder}
     */
    withLatitude(latitude: number): LocationConstraintExtensionBuilder;
    latitude: number;
    /**
     * Allows you to specify the Longitude of the user's expected location
     *
     * @param {Number} longitude
     *
     * @returns {LocationConstraintExtensionBuilder}
     */
    withLongitude(longitude: number): LocationConstraintExtensionBuilder;
    longitude: number;
    /**
     * Radius of the circle, centred on the specified location coordinates, where the device is
     * allowed to perform the share.
     *
     * If not provided, a default value of 150m will be used.
     *
     * @param {Number} radius The allowable distance, in metres, from the given lat/long location
     *
     * @returns {LocationConstraintExtensionBuilder}
     */
    withRadius(radius: number): LocationConstraintExtensionBuilder;
    radius: number;
    /**
     * Maximum acceptable distance, in metres, of the area of uncertainty associated with the device
     * location coordinates.
     *
     * If not provided, a default value of 150m will be used.
     *
     * @param {Number} maxUncertainty Maximum allowed measurement uncertainty, in metres
     *
     * @returns {LocationConstraintExtensionBuilder}
     */
    withMaxUncertainty(maxUncertainty: number): LocationConstraintExtensionBuilder;
    maxUncertainty: number;
    /**
     * @returns {Extension} Extension with LocationConstraintExtensionContent content
     */
    build(): Extension;
}
import Extension = require("./extension");
