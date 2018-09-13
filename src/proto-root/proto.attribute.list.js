'use strict';

const Age = require('../yoti_common/age').Age;
const {AttributeConverter} = require('../yoti_common/attribute.converter');
const AnchorProcessor = require('../yoti_common/anchor.processor').AnchorProcessor;

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
      const convertedValueByType = this.convertValueBasedOnContentType(attrValue, attrType);
      const attrNameInCamelCase = this.toCamelCase(attrName);

      attrList.push({ [attrNameInCamelCase]: convertedValueByType });

      if (attrName === 'selfie') {
        const imageUriValue = this.imageUriBasedOnContentType(attrValue, attrType);
        attrList.push({ base64SelfieUri: imageUriValue });
      }

      let attrData = null;
      try {
        const convertedValueByName = AttributeConverter.convertValueBaseOnAttributeName(convertedValueByType, attrName);
        attrData = {
          name: attrName,
          value: convertedValueByName,
          sources: processedAnchors.sources,
          verifiers: processedAnchors.verifiers,
        };
      } catch(err) {
        console.log(err.message);
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
