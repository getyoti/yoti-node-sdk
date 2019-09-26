const { SandboxAttribute } = require('./attribute');

/**
 * @class SandboxAttributeBuilder
 */
class SandboxAttributeBuilder {
  /**
   * @param {string} name
   */
  withName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {string} value
   */
  withValue(value) {
    this.value = value;
    return this;
  }

  /**
   * @param {*} derivation
   */
  withDerivation(derivation) {
    this.derivation = derivation;
    return this;
  }

  /**
   * @param {boolean} optional
   */
  withOptional(optional) {
    this.optional = optional;
    return this;
  }

  /**
   * @param {SandboxAnchors[]} anchors
   */
  withAnchors(anchors) {
    this.anchors = anchors;
    return this;
  }

  /**
   * @returns {SandboxAttribute}
   */
  build() {
    return new SandboxAttribute(
      this.name,
      this.value,
      this.derivation,
      this.optional,
      this.anchors
    );
  }
}

module.exports = {
  SandboxAttributeBuilder,
};
