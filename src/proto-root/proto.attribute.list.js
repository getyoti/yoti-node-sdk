'use strict';

module.exports = {

  decodeAttributeList(binaryData) {
    const attributesList = this.builder.attrpubapi_v1.AttributeList.decode(binaryData);
    const attributes = attributesList.get('attributes');
    const attrList = [];

    for (let i = 0; i < attributes.length; i += 1) {
      const attribute = attributes[i];
      const attrName = attribute.getName();
      const attrValue = attribute.getValue();
      const attrType = attribute.getContentType();

      const value = this.convertValueBasedOnContentType(attrValue, attrType);
      attrList.push({ [this.toCamelCase(attrName)]: value });

      if (attrName === 'selfie') {
        const imageUriValue = this.imageUriBasedOnContentType(attrValue, attrType);
        attrList.push({ base64SelfieUri: imageUriValue });
      }
    }

    return attrList;
  },

  encodeAttributeList(notificationData) {
    return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer();
  },
};
