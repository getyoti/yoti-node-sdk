'use strict'

const ProtoBuf = require('protobufjs')
const serverConfig = require('../../config/config.protobuf')

var instance

function initProtoBufBuilder () {
    let builder = ProtoBuf.newBuilder({ convertFieldsToCamelCase: true })
    let attributeListPath = serverConfig.CORE_ATTRIBUTE_LIST_PROTO_BUFF_PATH;
    let encryptedData = serverConfig.CORE_ENCRYPTED_DATA_PROTO_BUFF_PATH;
    
    ProtoBuf.loadProtoFile(attributeListPath, builder)
    ProtoBuf.loadProtoFile(encryptedData, builder)

    return {
        builder: builder.build()
    }
}

function buildProtoBufObject () {
    return Object.assign({},
        initProtoBufBuilder(),
        require('./utils'),
        require('./proto.attribute.list'),
        require('./proto.common.encrypted-data')
    )
}


exports.getInstance = () => {
	if(!instance) {
		instance = buildProtoBufObject();
	}
	return instance;
}

