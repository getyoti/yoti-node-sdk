export type Attribute = import('../data_type/attribute').Attribute;
/**
 * @typedef {import('../data_type/attribute').Attribute} Attribute
 */
/**
 * Profile of an application with convenience methods to access well-known attributes.
 */
export type Attribute = import('../data_type/attribute').Attribute;
/**
 * Profile of an application with convenience methods to access well-known attributes.
 *
 * @class ApplicationProfile
 *
 * @typedef {import('../data_type/attribute').Attribute} Attribute
 */
export class ApplicationProfile extends BaseProfile {
    /**
     * The name of the application.
     *
     * @returns {null|Attribute}
     */
    getName(): null | Attribute;
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
import { BaseProfile } from "./base.profile";
