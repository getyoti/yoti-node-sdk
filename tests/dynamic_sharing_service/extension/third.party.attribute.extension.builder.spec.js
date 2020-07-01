'use strict';

const { ThirdPartyAttributeExtensionBuilder } = require('../../..');
const ThirdPartyAttributeExtensionContent = require('../../../src/dynamic_sharing_service/extension/third.party.attribute.extension.content');
const AttributeDefinition = require('../../../src/data_type/attribute.definition');
const Extension = require('../../../src/dynamic_sharing_service/extension/extension');

describe('ThirdPartyAttributeExtensionBuilder', () => {
  it('should fail for expiryDate wrong type', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder();

    expect(() => builder.withExpiryDate('some_invalid_date')).toThrow(new TypeError('expiryDate must be instance of Date'));
  });

  it('should fail for undefined expiryDate', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder();

    expect(() => builder.withExpiryDate(undefined)).toThrow(new TypeError('expiryDate must be instance of Date'));
  });

  it('should fail for undefined definitions', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(new Date());

    expect(() => builder.withDefinitions(undefined)).toThrow(new TypeError('undefined must be instance of Object'));
  });

  it('should fail for array of non-string definitions', () => {
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(new Date());

    expect(() => builder.withDefinitions([1, 2, 3])).toThrow(new TypeError('all values in definitions must be a string'));
  });

  describe('#addDefinition', () => {
    it('should add a definition to the list of definitions already there', () => {
      const thirdPartyAttributeExtension = new ThirdPartyAttributeExtensionBuilder()
        .withExpiryDate(new Date())
        .withDefinitions(['definition_already_there'])
        .withDefinition('new_definition')
        .build();

      expect(thirdPartyAttributeExtension.content.getDefinitions().length).toEqual(2);
      expect(thirdPartyAttributeExtension.content.getDefinitions()[0])
        .toBeInstanceOf(AttributeDefinition);
      expect(thirdPartyAttributeExtension.content.getDefinitions()[1])
        .toBeInstanceOf(AttributeDefinition);
      expect(thirdPartyAttributeExtension.content.getDefinitions()[0].getName()).toEqual('definition_already_there');
      expect(thirdPartyAttributeExtension.content.getDefinitions()[1].getName()).toEqual('new_definition');
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
      expect(thirdPartyAttributeExtension.content.getDefinitions()[0].getName()).toEqual('definition_already_there');
    });
  });

  it('should build successfully', () => {
    const date = new Date();

    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(date)
      .withDefinitions([
        'some_definition',
        'some_other_definition',
      ]);

    const thirdPartyAttributeExtension = builder.build();

    expect(thirdPartyAttributeExtension).toBeInstanceOf(Extension);
    expect(thirdPartyAttributeExtension.content)
      .toBeInstanceOf(ThirdPartyAttributeExtensionContent);

    expect(date.toISOString())
      .toEqual(thirdPartyAttributeExtension.content.getExpiryDate().toISOString());

    expect(thirdPartyAttributeExtension.content.getDefinitions().length).toEqual(2);
    expect(thirdPartyAttributeExtension.content.getDefinitions()[0].getName()).toEqual('some_definition');
    expect(thirdPartyAttributeExtension.content.getDefinitions()[1].getName()).toEqual('some_other_definition');
  });

  test.each([
    ['2020-01-02T00:00:00.123456Z', '2020-01-02T00:00:00.123Z'],
    ['2020-01-02T00:00:00.123+04:00', '2020-01-01T20:00:00.123Z'],
    ['2020-01-02T00:00:00.123-04:00', '2020-01-02T04:00:00.123Z'],
  ])('should should convert to JSON correctly', (inputDate, outputDate) => {
    const date = new Date(inputDate);
    const builder = new ThirdPartyAttributeExtensionBuilder()
      .withExpiryDate(date)
      .withDefinitions([
        'some_definition',
        'some_other_definition',
      ]);

    const thirdPartyAttributeExtension = builder.build();
    const expectedJson = {
      type: 'THIRD_PARTY_ATTRIBUTE',
      content: {
        expiry_date: outputDate,
        definitions: [
          { name: 'some_definition' },
          { name: 'some_other_definition' },
        ],
      },
    };

    expect(JSON.stringify(expectedJson)).toEqual(JSON.stringify(thirdPartyAttributeExtension));
  });
});
