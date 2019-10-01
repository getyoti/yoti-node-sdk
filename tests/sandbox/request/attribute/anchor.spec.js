const {
  SandboxAnchorBuilder,
} = require('../../../../sandbox');

const SOME_ANCHOR_TYPE = 'someAnchorType';
const SOME_ANCHOR_SUB_TYPE = 'someAnchorSubType';
const SOME_ANCHOR_VALUE = 'someAnchorValue';
const SOME_TIMESTAMP = '1569503646050000';

describe('SandboxAnchor', () => {
  it('should build with all properties', () => {
    const sandboxAnchor = new SandboxAnchorBuilder()
      .withType(SOME_ANCHOR_TYPE)
      .withValue(SOME_ANCHOR_VALUE)
      .withTimestamp(SOME_TIMESTAMP)
      .withSubType(SOME_ANCHOR_SUB_TYPE)
      .build();

    const expectedData = {
      type: SOME_ANCHOR_TYPE,
      value: SOME_ANCHOR_VALUE,
      sub_type: SOME_ANCHOR_SUB_TYPE,
      timestamp: SOME_TIMESTAMP,
    };

    expect(JSON.stringify(sandboxAnchor))
      .toBe(JSON.stringify(expectedData));
  });
});
