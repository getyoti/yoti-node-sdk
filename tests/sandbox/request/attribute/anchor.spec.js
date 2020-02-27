const {
  SandboxAnchorBuilder,
} = require('../../../../sandbox');

const { YotiDate } = require('../../../../');

const SOME_ANCHOR_TYPE = 'someAnchorType';
const SOME_ANCHOR_SUB_TYPE = 'someAnchorSubType';
const SOME_ANCHOR_VALUE = 'someAnchorValue';
const SOME_DATE = YotiDate.fromDateString('2020-01-01');

describe('SandboxAnchor', () => {
  it('should build with all properties', () => {
    const sandboxAnchor = new SandboxAnchorBuilder()
      .withType(SOME_ANCHOR_TYPE)
      .withValue(SOME_ANCHOR_VALUE)
      .withTimestamp(SOME_DATE)
      .withSubType(SOME_ANCHOR_SUB_TYPE)
      .build();

    const expectedData = {
      type: SOME_ANCHOR_TYPE,
      value: SOME_ANCHOR_VALUE,
      sub_type: SOME_ANCHOR_SUB_TYPE,
      timestamp: SOME_DATE.getMicrosecondUnixTimestamp(),
    };

    expect(JSON.stringify(sandboxAnchor))
      .toBe(JSON.stringify(expectedData));
  });
});
