/**
 * Profile of a human user with convenience methods to access well-known attributes.
 *
 * @class Profile
 */
export class Profile extends BaseProfile {
    constructor(profileData: any);
    /**
     * The full name attribute.
     *
     * @returns {null|Attribute}
     */
    getFullName(): null | Attribute;
    /**
     * Corresponds to secondary names in passport, and first/middle names in English.
     *
     * @returns {null|Attribute}
     */
    getGivenNames(): null | Attribute;
    /**
     * Corresponds to primary name in passport, and surname in English.
     *
     * @returns {null|Attribute}
     */
    getFamilyName(): null | Attribute;
    /**
     * Date of birth.
     *
     * @returns {null|Attribute}
     */
    getDateOfBirth(): null | Attribute;
    /**
     * Did the user pass the age verification check?
     *
     * @deprecated use getAgeVerifications(), findAgeOverVerification(age)
     * or findAgeUnderVerification(age)
     *
     * @returns {null|Attribute}
     */
    getAgeVerified(): null | Attribute;
    /**
     * Finds all the 'Age Over' and 'Age Under' derived attributes returned with the profile,
     * and returns them wrapped in AgeVerification objects
     *
     * @returns {Array}
     */
    getAgeVerifications(): any[];
    /**
     * Searches for an AgeVerification corresponding to an 'Age Over' check for the given age
     *
     * @param {int} age
     *
     * @returns {AgeVerification|null}
     */
    findAgeOverVerification(age: any): AgeVerification | null;
    /**
     * Searches for an AgeVerification corresponding to an 'Age Under' check for the given age.
     *
     * @param {int} age
     *
     * @returns {AgeVerification|null}
     */
    findAgeUnderVerification(age: any): AgeVerification | null;
    /**
     * Searches for an AgeVerification corresponding to provided type and age.
     *
     * @param {string} type
     * @param {int} age
     *
     * @returns {AgeVerification|null}
     */
    findAgeVerification(type: string, age: any): AgeVerification | null;
    /**
     * Find all age verifications and put in key value object.
     */
    findAllAgeVerifications(): void;
    ageVerifications: {};
    /**
     * Corresponds to the gender in the passport; will be one of the strings
     * "MALE", "FEMALE", "TRANSGENDER" or "OTHER".
     *
     * @returns {null|Attribute}
     */
    getGender(): null | Attribute;
    /**
     * Corresponds to the nationality in the passport.
     *
     * @returns {Attribute|main}
     */
    getNationality(): Attribute | any;
    /**
     * The user's phone number, as verified at registration time. This will be a number with + for
     * international prefix and no spaces, e.g. "+447777123456".
     *
     * @returns {null|Attribute}
     */
    getPhoneNumber(): null | Attribute;
    /**
     * Photograph of user, encoded as a JPEG image.
     *
     * @returns {Attribute|main}
     */
    getSelfie(): Attribute | any;
    /**
     * The user's verified email address.
     *
     * @returns {null|Attribute}
     */
    getEmailAddress(): null | Attribute;
    /**
     * The user's postal address as a String.
     *
     * @returns {null|Attribute}
     */
    getPostalAddress(): null | Attribute;
    /**
     * The user's structured postal address as a Json.
     *
     * @returns {null|*}
     */
    getStructuredPostalAddress(): null | any;
    /**
     * Document details.
     *
     * @returns {null|DocumentDetails}
     */
    getDocumentDetails(): null | any;
    /**
     * Document images.
     *
     * @returns {null|Attribute}
     */
    getDocumentImages(): null | Attribute;
}
import { BaseProfile } from "./base.profile";
import { Attribute } from "../data_type/attribute";
import { AgeVerification } from "../data_type/age.verification";
