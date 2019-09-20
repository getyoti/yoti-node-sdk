const { SandboxAnchor } = require('./anchor');

class SandboxAnchorBuilder {
  constructor() {
    this.anchors = [];
  }

  withType(type) {
    this.type = type;
    return this;
  }

  withValue(value) {
    this.value = value;
    return this;
  }

  withSubType(subType) {
    this.subType = subType;
    return this;
  }

  withTimestamp(timestamp) {
    this.timestamp = timestamp;
    return this;
  }

  build() {
    return new SandboxAnchor(this.type, this.value, this.subType, this.timestamp);
  }
}

module.exports = {
  SandboxAnchorBuilder,
};
