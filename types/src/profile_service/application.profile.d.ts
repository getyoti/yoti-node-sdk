/**
 * Profile of an application with convenience methods to access well-known attributes.
 *
 * @class ApplicationProfile
 */
export class ApplicationProfile extends BaseProfile {
    /**
     * The name of the application.
     * @typedef {import('../data_type/attribute')} Attribute
     *
     * @returns {null|Attribute}
     */
    getName(): typeof import("../data_type/attribute");
    /**
     * The URL where the application is available at.
     * @typedef {import('../data_type/attribute')} Attribute
     *
     * @returns {null|Attribute}
     */
    getUrl(): typeof import("../data_type/attribute");
    /**
     * The logo of the application that will be displayed to users that perform a share with it.
     * @typedef {import('../data_type/attribute')} Attribute
     *
     * @returns {null|Attribute}
     */
    getLogo(): typeof import("../data_type/attribute");
    /**
     * The background colour that will be displayed on each receipt the user gets, as a result
     * of a share with the application.
     * @typedef {import('../data_type/attribute')} Attribute
     *
     * @returns {null|Attribute}
     */
    getReceiptBgColor(): typeof import("../data_type/attribute");
}
import { BaseProfile } from "./base.profile";
