const SandboxAttribute = require('./attribute');

/**
 * @class SandboxAttributeBuilder
 */
class SandboxAttributeBuilder {
  /**
   * Setup initial property values.
   */
  constructor() {
    this.optional = false;
    this.derivation = null;
    this.anchors = null;
  }

  /**
   * @param {string} name
   *
   * @returns {SandboxAttributeBuilder}
   */
  withName(name) {
    this.name = name;
    return this;
  }

  /**
   * @param {string} value
   *
   * @returns {SandboxAttributeBuilder}
   */
  withValue(value) {
    this.value = value;
    return this;
  }

  /**
   * @param {string} derivation
   *
   * @returns {SandboxAttributeBuilder}
   */
  withDerivation(derivation) {
    this.derivation = derivation;
    return this;
  }

  /**
   * @param {boolean} optional
   *
   * @returns {SandboxAttributeBuilder}
   */
  withOptional(optional) {
    this.optional = optional;
    return this;
  }

  /**
   * @param {SandboxAnchors[]} anchors
   *
   * @returns {SandboxAttributeBuilder}
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

module.exports = SandboxAttributeBuilder;
