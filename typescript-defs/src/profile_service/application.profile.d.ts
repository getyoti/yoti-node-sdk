/**
 * Profile of an application with convenience methods to access well-known attributes.
 *
 * @class ApplicationProfile
 */
export class ApplicationProfile extends BaseProfile {
    constructor(profileData: any);
    /**
     * The name of the application.
     *
     * @returns {null|Attribute}
     */
    getName(): null | any;
    /**
     * The URL where the application is available at.
     *
     * @returns {null|Attribute}
     */
    getUrl(): null | any;
    /**
     * The logo of the application that will be displayed to users that perform a share with it.
     *
     * @returns {null|Attribute}
     */
    getLogo(): null | any;
    /**
     * The background colour that will be displayed on each receipt the user gets, as a result
     * of a share with the application.
     *
     * @returns {null|Attribute}
     */
    getReceiptBgColor(): null | any;
}
import { BaseProfile } from "./base.profile";
