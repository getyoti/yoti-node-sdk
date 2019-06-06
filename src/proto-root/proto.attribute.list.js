'use strict';

const Age = require('../yoti_common/age').Age;
const { AttributeConverter } = require('../yoti_common/attribute.converter');
const AnchorProcessor = require('../yoti_common/anchor.processor').AnchorProcessor;
const constants = require('../yoti_common/constants');
const Image = require('../data_type/image');

module.exports = {

  decodeAttributeList(binaryData) {
    const attributesList = this.builder.attrpubapi_v1.AttributeList.decode(binaryData);
    const attributes = attributesList.get('attributes');
    const attrList = [];
    const profileAttributes = [];

    for (let i = 0; i < attributes.length; i += 1) {
      const attribute = attributes[i];
      const attrName = attribute.getName();
      const attrValue = attribute.getValue();
      const attrType = attribute.getContentType();
      const processedAnchors = AnchorProcessor.process(attribute.anchors);
      const attrNameInCamelCase = this.toCamelCase(attrName);

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
        };
      } catch (err) {
        console.log(`${err.message} (Attribute: ${attrName})`);
      }
      profileAttributes[attrName] = attrData;

      if (attrData && Age.conditionVerified(attrNameInCamelCase)) {
        const ageCondition = Object.assign({}, attrData);
        ageCondition.name = 'age_verified';
        profileAttributes.age_verified = ageCondition;
      }
    }
    attrList.push({ extendedProfile: profileAttributes });

    return attrList;
  },

  encodeAttributeList(notificationData) {
    return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer();
  },
};
