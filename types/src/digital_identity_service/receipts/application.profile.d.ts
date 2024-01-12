export = ApplicationProfile;
/**
 * @typedef {import('../../data_type/attribute').Attribute} Attribute
 */
/**
 * Profile of a human user with convenience methods to access well-known attributes.
 *
 * @class Profile
 *
 */
declare class ApplicationProfile extends BaseProfile {
    getName(): import("../../data_type/attribute").Attribute;
    /**
     * The URL where the application is available at.
     *
     * @returns {null|Attribute}
     */
    getUrl(): null | Attribute;
    /**
     * The logo of the application that will be displayed to users that perform a share with it.
     *
     * @returns {null|Attribute}
     */
    getLogo(): null | Attribute;
    /**
     * The background colour that will be displayed on each receipt the user gets, as a result
     * of a share with the application.
     *
     * @returns {null|Attribute}
     */
    getReceiptBgColor(): null | Attribute;
}
declare namespace ApplicationProfile {
    export { Attribute };
}
import BaseProfile = require("./base.profile");
type Attribute = import('../../data_type/attribute').Attribute;
