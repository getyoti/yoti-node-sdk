const { ExtensionBuilder } = require('../../..');
const Extension = require('../../../src/dynamic_sharing_service/extension/extension');

describe('ExtensionBuilder', () => {
  it('should build an extension', () => {
    const extension = new ExtensionBuilder()
      .withType('test type')
      .withContent('test content')
      .build();

    expect(extension).toBeInstanceOf(Extension);
    expect(extension.getType()).toBe('test type');
    expect(extension.getContent()).toBe('test content');

    const expectedJson = JSON.stringify({
      type: 'test type',
      content: 'test content',
    });
    expect(JSON.stringify(extension)).toBe(expectedJson);
  });
});
