'use strict'

exports.Payload = class Payload {
    constructor(data) {
        this.data = data;
    }

    getPayloadJSON() {
        let data = this.data;
        if(typeof data === 'string') {
            data = new Buffer(data).toString('utf8');
        }
        return JSON.stringify(data);
    }

    getBase64Payload() {
        return new Buffer(this.getPayloadJSON()).toString('base64');
    }

    getRawData() {
        return this.data;
    }
}