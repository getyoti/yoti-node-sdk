export class BaseProfile {
    /**
     * @param {Array} attributes
     */
    constructor(attributes?: any[]);
    /** @private */
    private attributes;
    /** @private */
    private attributesMap;
    /**
     * Return Attribute object.
     *
     * @param attrName
     *
     * @returns {Attribute|null}
     */
    getAttribute(attrName: any): Attribute | null;
    /**
     * Return list of all Attribute objects for provided attribute name.
     *
     * @param attrName
     *
     * @returns {Attribute[]}
     */
    getAttributesByName(attrName: any): Attribute[];
    /**
     * Return first attribute found by id.
     *
     * @param attrId
     *
     * @returns {Attribute}
     */
    getAttributeById(attrId: any): Attribute;
    /**
     * Return array of all attributes for the profile.
     *
     * @returns {Attribute[]}
     */
    getAttributesList(): Attribute[];
    /**
     * Returns a string representing the object.
     *
     * @returns {string}
     */
    toString(): string;
}
import { Attribute } from "../data_type/attribute";
