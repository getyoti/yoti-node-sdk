'use strict';

const Age = require('../yoti_common/age').Age;
const { AttributeConverter } = require('../yoti_common/attribute.converter');
const AnchorProcessor = require('../yoti_common/anchor.processor').AnchorProcessor;
const constants = require('../yoti_common/constants');
const Image = require('../data_type/image');

module.exports = {

  /**
   * Decode all attributes.
   *
   * @param {Buffer} binaryData
   */
  decodeAttributeList(binaryData) {
    const attributesList = this.builder.attrpubapi_v1.AttributeList.decode(binaryData);
    const attributes = attributesList.get('attributes');
    const attrList = [];
    const extendedProfile = {};
    const extendedProfileList = [];

    for (let i = 0; i < attributes.length; i += 1) {
      const attribute = attributes[i];
      const attrName = attribute.getName();
      const attrValue = attribute.getValue();
      const attrType = attribute.getContentType();
      const attrId = attribute.getEphemeralId();
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
  },

  encodeAttributeList(notificationData) {
    return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer();
  },
};
