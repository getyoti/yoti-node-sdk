'use strict'

const convertString = require('convert-string');
const serialize = require('node-serialize');

exports.Payload = class Payload {
    constructor(data) {
        this.data = data;
    }

    getByteArray() {
        let payloadData = this.data;
        if( typeof payloadData !== 'string' ) {
          payloadData = serialize.serialize(payloadData);
        }
        // Convert payload data to byte array
        let byteArray = convertString.UTF8.stringToBytes(payloadData);
        let byteString = serialize.serialize(byteArray);
        // Convert to buffer and base64 encode it
        return new Buffer(byteString || '').toString('base64');
    }

    getRawData() {
        return this.data;
    }
}