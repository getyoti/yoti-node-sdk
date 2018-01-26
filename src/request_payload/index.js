'use strict'

var data;

exports.Payload = class Payload {
    constructor(data) {
        this.data = data;
    }

    getByteArray() {
        if( typeof this.data !== 'string' ) {
            this.data = this.data.serializeArray();
        }

        return this.data;
    }
}