const {
  expect,
} = require('chai');

const ExtensionBuilder = require('../../../src/dynamic_sharing_service/extension/extension.builder');
const Extension = require('../../../src/dynamic_sharing_service/extension/extension');

describe('ExtensionBuilder', () => {
  it('should build an extension', () => {
    const extension = new ExtensionBuilder()
      .withType('test type')
      .withContent('test content')
      .build();

    expect(extension).to.be.instanceOf(Extension);
    expect(extension.getType()).to.equal('test type');
    expect(extension.getContent()).to.equal('test content');

    const expectedJson = JSON.stringify({
      type: 'test type',
      content: 'test content',
    });
    expect(JSON.stringify(extension)).to.equal(expectedJson);
  });
});
