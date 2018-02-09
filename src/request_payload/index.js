'use strict'

const utf8 = require('utf8');
const serialize = require('node-serialize');

exports.Payload = class Payload {
    constructor(data) {
        this.data = data;
    }

    getPayloadJSON() {
        let data = this.data;
        if(typeof data === 'string') {
            data = utf8.encode(data);
        }
        return JSON.stringify(this.data);
    }

    getBase64Payload() {
        return this.getPayloadJSON().toBase64();
    }

    getRawData() {
        return this.data;
    }
}