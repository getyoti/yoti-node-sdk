'use strict'

const convertString = require('convert-string');
const serialize = require('node-serialize');
const URLSafeBase64 = require('urlsafe-base64');

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
        // Convert to buffer so we can base64 encode it
        let buffer = new Buffer(byteString || '');

        return URLSafeBase64.encode(buffer);
    }

    getRawData() {
        return this.data;
    }
}