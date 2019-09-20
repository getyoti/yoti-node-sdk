class SandboxAnchor {
  constructor(name, value, derivation, optional, anchors = []) {
    this.name = name;
    this.value = value;
    this.derivation = derivation;
    this.optional = optional;
    this.anchors = anchors;
  }

  getName() {
    return this.name;
  }

  getValue() {
    return this.value;
  }

  getDerivation() {
    return this.derivation;
  }

  getOptional() {
    return this.optional;
  }

  getAnchors() {
    return this.anchors;
  }

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
  SandboxAnchor,
};
