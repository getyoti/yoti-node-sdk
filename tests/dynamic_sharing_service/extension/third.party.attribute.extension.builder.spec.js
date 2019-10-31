'use strict';

const ThirdPartyAttributeExtensionBuilder = require('../../../src/dynamic_sharing_service/extension/third.party.attribute.extension.builder');
const ThirdPartyAttributeExtensionContent = require('../../../src/dynamic_sharing_service/extension/third.party.attribute.extension.content');
const Extension = require('../../../src/dynamic_sharing_service/extension/extension');

describe('ThirdPartyAttributeExtensionBuilder', () => {
  it('should fail for expiryDate wrong type', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate('some_invalid_date');

    expect(() => builder.build()).toThrow(new TypeError('expiryDate must be instance of Date'));
  });

  it('should fail for undefined expiryDate', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(undefined);

    expect(() => builder.build()).toThrow(new TypeError('expiryDate must be instance of Date'));
  });

  it('should fail for undefined definitions', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(new Date())
      .withDefinitions(undefined);

    expect(() => builder.build()).toThrow(new TypeError('undefined must be instance of Object'));
  });

  it('should fail for array of non-string definitions', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(new Date())
      .withDefinitions([1, 2, 3]);

    expect(() => builder.build()).toThrow(new TypeError('all values in definitions must be a string'));
  });

  describe('#addDefinition', () => {
    it('should add a definition to the list of definitions already there', () => {
      const thirdPartyAttributeExtension = new ThirdPartyAttributeExtensionBuilder()
        .withExpiryDate(new Date())
        .withDefinitions(['definition_already_there'])
        .withDefinition('new_definition')
        .build();

      expect(thirdPartyAttributeExtension.content.getDefinitions().length).toEqual(2);
      expect(thirdPartyAttributeExtension.content.getDefinitions()[0]).toEqual('definition_already_there');
      expect(thirdPartyAttributeExtension.content.getDefinitions()[1]).toEqual('new_definition');
    });
  });

  describe('#addDefinitions', () => {
    it('should overwrite any definitions already in the list', () => {
      const thirdPartyAttributeExtension = new ThirdPartyAttributeExtensionBuilder()
        .withExpiryDate(new Date())
        .withDefinition('new_definition')
        .withDefinitions(['definition_already_there'])
        .build();

      expect(thirdPartyAttributeExtension.content.getDefinitions().length).toEqual(1);
      expect(thirdPartyAttributeExtension.content.getDefinitions()[0]).toEqual('definition_already_there');
    });
  });

  it('should build successfully', () => {
    const date = new Date();

    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(date)
      .withDefinitions(['some_definition', 'some_other_definition']);

    const thirdPartyAttributeExtension = builder.build();

    expect(thirdPartyAttributeExtension).toBeInstanceOf(Extension);
    expect(thirdPartyAttributeExtension.content)
      .toBeInstanceOf(ThirdPartyAttributeExtensionContent);

    expect(date.toISOString())
      .toEqual(thirdPartyAttributeExtension.content.getExpiryDate().toISOString());

    expect(thirdPartyAttributeExtension.content.getDefinitions().length).toEqual(2);
    expect(thirdPartyAttributeExtension.content.getDefinitions()[0]).toEqual('some_definition');
    expect(thirdPartyAttributeExtension.content.getDefinitions()[1]).toEqual('some_other_definition');
  });

  it('should should convert to JSON correctly', () => {
    const date = new Date();
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(date)
      .withDefinitions(['some_definition', 'some_other_definition']);

    const thirdPartyAttributeExtension = builder.build();
    const expectedJson = {
      type: 'THIRD_PARTY_ATTRIBUTE',
      content: {
        expiry_date: date.toISOString(),
        definitions: [
          { name: 'some_definition' },
          { name: 'some_other_definition' },
        ],
      },
    };

    expect(JSON.stringify(expectedJson)).toEqual(JSON.stringify(thirdPartyAttributeExtension));
  });
});

