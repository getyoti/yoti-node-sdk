const { TransactionalFlowExtensionBuilder } = require('../../..');
const Extension = require('../../../src/dynamic_sharing_service/extension/extension');

const TRANSACTIONAL_FLOW = 'TRANSACTIONAL_FLOW';

describe('TransactionalFlowExtensionBuilder', () => {
  it('should fail for null content', () => {
    const builder = new TransactionalFlowExtensionBuilder();
    expect(() => builder.withContent(null)).toThrow(new TypeError('content cannot be null'));
  });

  it('should build with content', () => {
    const content = { test: 'content' };
    const extension = new TransactionalFlowExtensionBuilder()
      .withContent(content)
      .build();

    expect(extension).toBeInstanceOf(Extension);
    expect(extension.getType()).toBe(TRANSACTIONAL_FLOW);
    expect(extension.getContent()).toBe(content);

    const expectedJson = JSON.stringify({
      type: TRANSACTIONAL_FLOW,
      content,
    });
    expect(JSON.stringify(extension)).toBe(expectedJson);
  });
});
