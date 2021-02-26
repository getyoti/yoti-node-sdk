export class BaseProfile {
    /**
     * @param {object} profileData
     */
    constructor(profileData: object);
    profileData: any;
    /**
     * Return Attribute object.
     *
     * @param attrName
     *
     * @returns {null|Attribute}
     */
    getAttribute(attrName: any): null | Attribute;
    /**
     * Return all attributes for the profile.
     *
     * @returns {Object.<string, Attribute>}
     */
    getAttributes(): {
        [x: string]: Attribute;
    };
    /**
     * @param {*} prop
     */
    propertyExists(prop: any): any;
    /**
     * Find attributes starting with provided name.
     *
     * @param {string} name
     *
     * @returns {Array}
     */
    findAttributesStartingWith(name: string): any[];
    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString(): string;
}
import { Attribute } from "../data_type/attribute";
