const { SandboxAttribute } = require('./attribute');

class SandboxAttributeBuilder {
  constructor() {
    this.anchors = [];
  }

  withName(name) {
    this.name = name;
    return this;
  }

  withValue(value) {
    this.value = value;
    return this;
  }

  withDerivation(derivation) {
    this.derivation = derivation;
    return this;
  }

  withOptional(optional) {
    this.optional = optional;
    return this;
  }

  withAnchors(anchors) {
    this.anchors = anchors;
    return this;
  }

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
