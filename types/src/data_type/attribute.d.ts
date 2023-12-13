/**
 * A class to represent a Yoti attribute.
 *
 * A Yoti attribute consists of the attribute name, an associated
 * attribute value, and a list of Anchors from Yoti.
 *
 * It may hold one or more anchors, which specify how an attribute has been provided
 * and how it has been verified within the Yoti platform.
 */
export class Attribute {
    constructor(attrObj: any);
    value: any;
    name: any;
    sources: any;
    verifiers: any;
    id: any;
    anchors: any[];
    /**
     * Retrieves the id of an attribute. It can be undefined.
     *
     * @returns {*}
     */
    getId(): any;
    /**
     * Retrieves the value of an attribute. If this is null, the default value for
     * the type is returned.
     *
     * @returns {*}
     */
    getValue(): any;
    /**
     * Gets the name of the attribute.
     *
     * @returns {string}
     */
    getName(): string;
    /**
     * Sources are a subset of the anchors associated with an attribute, where the
     * anchor type is SOURCE.
     *
     * @returns {YotiAnchor[]}
     */
    getSources(): YotiAnchor[];
    /**
     * Verifiers are a subset of the anchors associated with an attribute, where the
     * anchor type is VERIFIER.
     *
     * @returns {YotiAnchor[]}
     */
    getVerifiers(): YotiAnchor[];
    /**
     * Get the anchors for an attribute. If an attribute has only one SOURCE
     * Anchor with the value set to "USER_PROVIDED" and zero VERIFIER Anchors,
     * then the attribute is a self-certified one.
     *
     * @returns {YotiAnchor[]}
     */
    getAnchors(): YotiAnchor[];
}
