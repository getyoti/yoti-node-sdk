'use strict'

var convertString = require('convert-string');
var serialize = require('node-serialize');
var URLSafeBase64 = require('urlsafe-base64');
var data;

exports.Payload = class Payload {
    constructor(data) {
        this.data = data;
    }

    getByteArray() {
        let payloadData = this.data;
        if( typeof payloadData !== 'string' ) {
          payloadData = serialize.serialize(payloadData);
        }
        //let buffer = Buffer.from(this.data);
        // Convert payload data to byte array
        let byteArray = convertString.UTF8.stringToBytes(payloadData);
        let byteString = serialize.serialize(byteArray);
        // Convert to buffer so we can base64 encode it
        let buffer = new Buffer(byteString || '');
        let base64Data = URLSafeBase64.encode(buffer);

        return base64Data;
    }
}