'use strict';

/**
 * A class to represent a Yoti attribute.
 *
 * A Yoti attribute consists of the attribute name, an associated
 * attribute value, and a list of Anchors from Yoti.
 *
 * It may hold one or more anchors, which specify how an attribute has been provided
 * and how it has been verified within the Yoti platform.
 */
class Attribute {
  constructor(attrObj) {
    this.value = attrObj.value;
    this.name = attrObj.name;
    this.sources = attrObj.sources;
    this.verifiers = attrObj.verifiers;

    this.anchors = [];
    if (attrObj.anchors) {
      Object.keys(attrObj.anchors).forEach((key) => {
        this.anchors = this.anchors.concat(attrObj.anchors[key]);
      });
    }
  }

  /**
   * Retrieves the value of an attribute. If this is null, the default value for
   * the type is returned.
   *
   * @returns {*}
   */
  getValue() {
    return this.value;
  }

  /**
   * Gets the name of the attribute.
   *
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * Sources are a subset of the anchors associated with an attribute, where the
   * anchor type is SOURCE.
   *
   * @returns {YotiAnchor[]}
   */
  getSources() {
    return this.sources;
  }

  /**
   * Verifiers are a subset of the anchors associated with an attribute, where the
   * anchor type is VERIFIER.
   *
   * @returns {YotiAnchor[]}
   */
  getVerifiers() {
    return this.verifiers;
  }

  /**
   * Get the anchors for an attribute. If an attribute has only one SOURCE
   * Anchor with the value set to "USER_PROVIDED" and zero VERIFIER Anchors,
   * then the attribute is a self-certified one.
   *
   * @returns {YotiAnchor[]}
   */
  getAnchors() {
    return this.anchors;
  }
}

module.exports = {
  Attribute,
};
