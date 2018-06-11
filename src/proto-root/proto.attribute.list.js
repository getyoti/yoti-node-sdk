'use strict';

const Age = require('../yoti_common/age').Age;
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
      const attrConvertedValue = this.convertValueBasedOnContentType(attrValue, attrType);

      const attrObj = {
        name: attrName,
        value: attrConvertedValue,
        sources: processedAnchors.sources,
        verifiers: processedAnchors.verifiers,
      };
      attrList.push({ [this.toCamelCase(attrName)]: attrConvertedValue });

      if (attrName === 'selfie') {
        const imageUriValue = this.imageUriBasedOnContentType(attrValue, attrType);
        attrList.push({ base64SelfieUri: imageUriValue });
      }

      if (Age.conditionVerified(this.toCamelCase(attrName))) {
        const ageCondition = Object.assign({}, attrObj);
        ageCondition.name = 'age_verified';
        profileAttributes.age_verified = ageCondition;
      } else {
        profileAttributes[attrName] = attrObj;
      }
    }
    attrList.push({ extendedProfile: profileAttributes });

    return attrList;
  },

  encodeAttributeList(notificationData) {
    return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer();
  },
};
