'use strict';

const ProtoBuf = require('protobufjs');

module.exports.toCamelCase = (str) => ProtoBuf.Util.toCamelCase(str);
