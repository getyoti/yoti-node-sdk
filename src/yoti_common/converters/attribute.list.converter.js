'use strict';

const { util: { camelCase } } = require('protobufjs');

const Age = require('../age').Age;
const { AttributeConverter } = require('./attribute.converter');
const AnchorProcessor = require('../anchor.processor').AnchorProcessor;
const constants = require('../constants');
const Image = require('../../data_type/image');

module.exports.AttributeListConverter = class AttributeListConverter {
  static convertAttributeList(attributesList) {
    const attributes = attributesList.attributes;
    const attrList = [];
    const extendedProfile = {};
    const extendedProfileList = [];

    for (let i = 0; i < attributes.length; i += 1) {
      const attribute = attributes[i];
      const attrName = attribute.name;
      const attrValue = attribute.value;
      const attrType = attribute.contentType;
      const attrId = attribute.ephemeralId;
      const processedAnchors = AnchorProcessor.process(attribute.anchors);

      const attrNameInCamelCase = camelCase(attrName);

      let attrData = null;
      try {
        const convertedValueByType = AttributeConverter
          .convertValueBasedOnContentType(attrValue, attrType);

        // Handle selfies for backwards compatibility.
        if (attrName === constants.ATTR_SELFIE && convertedValueByType instanceof Image) {
          attrList.push({ base64SelfieUri: convertedValueByType.getBase64Content() });
          attrList.push({ [attrNameInCamelCase]: convertedValueByType.getContent() });
        } else {
          attrList.push({ [attrNameInCamelCase]: convertedValueByType });
        }

        const convertedValueByName = AttributeConverter.convertValueBasedOnAttributeName(
          convertedValueByType,
          attrName
        );
        attrData = {
          name: attrName,
          value: convertedValueByName,
          sources: processedAnchors.sources,
          verifiers: processedAnchors.verifiers,
          anchors: processedAnchors,
          id: attrId,
        };
      } catch (err) {
        console.log(`${err.message} (Attribute: ${attrName})`);
      }
      extendedProfile[attrName] = attrData;
      extendedProfileList.push(attrData);

      if (attrData && Age.conditionVerified(attrNameInCamelCase)) {
        const ageCondition = Object.assign({}, attrData);
        ageCondition.name = 'age_verified';
        extendedProfile.age_verified = ageCondition;
        extendedProfileList.push(ageCondition);
      }
    }
    attrList.push({ extendedProfile });
    attrList.push({ extendedProfileList });

    return attrList;
  }
};
