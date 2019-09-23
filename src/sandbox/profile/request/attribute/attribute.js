/**
 * @class SandboxAttribute
 */
class SandboxAttribute {
  /**
   * @param {string} name
   * @param {string} value
   * @param {*} derivation
   * @param {boolean} optional
   * @param {SandboxAnchor[]} anchors
   */
  constructor(name, value, derivation, optional, anchors = []) {
    this.name = name;
    this.value = value;
    this.derivation = derivation;
    this.optional = optional;
    this.anchors = anchors;
  }

  /**
   * @returns {string}
   */
  getName() {
    return this.name;
  }

  /**
   * @returns {string}
   */
  getValue() {
    return this.value;
  }

  /**
   * @returns {*}
   */
  getDerivation() {
    return this.derivation;
  }

  /**
   * @returns {boolean}
   */
  getOptional() {
    return this.optional;
  }

  /**
   * @returns {SandboxAnchor[]}
   */
  getAnchors() {
    return this.anchors;
  }

  /**
   * @returns {Object} data for JSON.stringify()
   */
  toJSON() {
    return {
      name: this.name,
      value: this.value,
      derivation: this.derivation,
      optional: this.optional,
      anchors: this.anchors,
    };
  }
}

module.exports = {
  SandboxAttribute,
};
