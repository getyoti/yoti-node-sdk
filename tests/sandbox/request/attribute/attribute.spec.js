const {
  SandboxAttributeBuilder,
  SandboxAnchorBuilder,
} = require('../../../..');

const SOME_NAME = 'someName';
const SOME_VALUE = 'someValue';
const SOME_DERIVATION = 'someDerivation';
const SOME_ANCHOR_TYPE = 'someAnchorType';
const SOME_ANCHOR_VALUE = 'someAnchorValue';

describe('SandboxAttribute', () => {
  it('should build with required properties', () => {
    const sandboxAttribute = new SandboxAttributeBuilder()
      .withName(SOME_NAME)
      .withValue(SOME_VALUE)
      .build();

    const expectedData = {
      name: SOME_NAME,
      value: SOME_VALUE,
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build with derivation', () => {
    const sandboxAttribute = new SandboxAttributeBuilder()
      .withName(SOME_NAME)
      .withValue(SOME_VALUE)
      .withDerivation(SOME_DERIVATION)
      .build();

    const expectedData = {
      name: SOME_NAME,
      value: SOME_VALUE,
      derivation: SOME_DERIVATION,
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
  it('should build with anchors', () => {
    const sandboxAnchor = new SandboxAnchorBuilder()
      .withType(SOME_ANCHOR_TYPE)
      .withValue(SOME_ANCHOR_VALUE)
      .build();

    const sandboxAttribute = new SandboxAttributeBuilder()
      .withName(SOME_NAME)
      .withValue(SOME_VALUE)
      .withAnchors([sandboxAnchor])
      .build();

    const expectedData = {
      name: SOME_NAME,
      value: SOME_VALUE,
      anchors: [{
        type: SOME_ANCHOR_TYPE,
        value: SOME_ANCHOR_VALUE,
      }],
    };

    expect(JSON.stringify(sandboxAttribute))
      .toBe(JSON.stringify(expectedData));
  });
});
