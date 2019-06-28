const {
  expect,
} = require('chai');

const { WantedAttributeBuilder } = require('../../../');
const WantedAttribute = require('../../../src/dynamic_sharing_service/policy/wanted.attribute');

describe('WantedAttributeBuilder', () => {
  it('should build a wanted attribute', () => {
    const wantedAttribute = new WantedAttributeBuilder()
      .withName('test name')
      .withDerivation('test derivation')
      .build();

    expect(wantedAttribute).to.be.instanceOf(WantedAttribute);
    expect(wantedAttribute.getName()).to.equal('test name');
    expect(wantedAttribute.getDerivation()).to.equal('test derivation');

    const expectedJson = JSON.stringify({
      name: 'test name',
      derivation: 'test derivation',
      optional: false,
    });
    expect(JSON.stringify(wantedAttribute)).to.equal(expectedJson);
  });
});
