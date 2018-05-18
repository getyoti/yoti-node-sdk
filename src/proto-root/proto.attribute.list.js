'use strict';

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
      const anchors = AnchorProcessor.process(attribute.anchors);
      const value = this.convertValueBasedOnContentType(attrValue, attrType);
      const attrObj = {
        'orig_name': attrName,
        'value': value,
        'sources': anchors['sources'],
        'verifiers': anchors['verifiers']
      };
      attrList.push({ [this.toCamelCase(attrName)]: value });
      let profileAttrName = this.toCamelCase(attrName);
      profileAttributes[profileAttrName] = attrObj;

      if (attrName === 'selfie') {
        const imageUriValue = this.imageUriBasedOnContentType(attrValue, attrType);
        attrList.push({ base64SelfieUri: imageUriValue });
      }
    }
    attrList.push({ 'userProfile': profileAttributes });

    return attrList;
  },

  encodeAttributeList(notificationData) {
    return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer();
  },
};
