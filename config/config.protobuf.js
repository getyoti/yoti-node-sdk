'use strict'

let path = require('path')

// Protobuff structures
// ----------------------------------------------------------------------------------------------------------------------------

var PROTO_BUFF_PATH = module.exports.PROTO_BUFF_PATH = path.join( __dirname + '/../src/protobuf/')
var PROTO_BUFF_ATTRIBUTE_API_PATH = module.exports.PROTO_BUFF_ATTRIBUTE_API_PATH = path.resolve( PROTO_BUFF_PATH + '/attribute-public-api/attrpubapi_v1')
var CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH = module.exports.CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH = path.resolve(PROTO_BUFF_ATTRIBUTE_API_PATH + '/List.proto')

var PROTO_BUFF_COMMON_API_PATH = module.exports.PROTO_BUFF_COMMON_API_PATH = path.resolve( PROTO_BUFF_PATH + '/common-public-api/compubapi_v1')
var CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH = module.exports.CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH = path.resolve(PROTO_BUFF_COMMON_API_PATH + '/EncryptedData.proto')
