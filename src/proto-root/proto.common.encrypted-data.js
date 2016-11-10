'use strict'

module.exports = {

    decodeEncryptedData: function (binaryData) {
        var decodedData = this.builder.compubapi_v1.EncryptedData.decode(binaryData)
        decodedData.cipherText = decodedData.cipherText.toString('base64')
        decodedData.iv = decodedData.iv.toString('base64')
        return decodedData
    },

    encodeEncryptedData: function (notificationData) {
        return new this.builder.compubapi_v1.EncryptedData(notificationData).toArrayBuffer()
    }
}