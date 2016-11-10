'use strict'

module.exports = {

    decodeAttributeList: function (binaryData) {
        let attributesList = this.builder.attrpubapi_v1.AttributeList.decode(binaryData)
        
        let attrList = attributesList.get('attributes').map(attribute => {
            let value = this.convertValueBasedOnContentType(attribute.getValue(), attribute.getContentType())

            return {[this.toCamelCase(attribute.getName())]: value}
        })

        return attrList
    },

    encodeAttributeList: function (notificationData) {
        return new this.builder.attrpubapi_v1.AttributeList(notificationData).toArrayBuffer()
    }
}
