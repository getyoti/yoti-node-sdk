const Validation = require('../../../../yoti_common/validation');
const { SandboxAnchor } = require('./anchor');

/**
 * @class SandboxAttribute
 */
class SandboxAttribute {
  /**
   * @param {string} name
   * @param {string} value
   * @param {string} derivation
   * @param {boolean} optional
   * @param {SandboxAnchor[]} anchors
   */
  constructor(name, value, derivation = null, optional = null, anchors = null) {
    Validation.isString(name, 'name');
    this.name = name;

    Validation.isString(value, 'value');
    this.value = value;

    if (derivation !== null) {
      Validation.isString(derivation, 'derivation');
    }
    this.derivation = derivation;

    if (optional !== null) {
      Validation.isBoolean(optional, 'optional');
    }
    this.optional = optional;

    if (anchors !== null) {
      Validation.isArrayOfType(anchors, SandboxAnchor, 'anchors');
    }
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
    const json = {
      name: this.getName(),
      value: this.getValue(),
    };
    if (this.getDerivation() !== null) {
      json.derivation = this.getDerivation();
    }
    if (this.getOptional() !== null) {
      json.optional = this.getOptional();
    }
    if (this.getAnchors() !== null) {
      json.anchors = this.getAnchors();
    }
    return json;
  }
}

module.exports = {
  SandboxAttribute,
};
