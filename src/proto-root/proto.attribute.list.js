'use strict';

module.exports = {

  decodeAttributeList(binaryData) {
    const attributesList = this.builder.attrpubapi_v1.AttributeList.decode(binaryData);

    const attrList = attributesList.get('attributes').map((attribute) => {
      const value = this.convertValueBasedOnContentType(
        attribute.getValue(),
        attribute.getContentType()
      );

      return { [this.toCamelCase(attribute.getName())]: value };
    });

    return attrList;
  },
  encodeAttributeList(notificationData) {
    return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer();
  },
};
