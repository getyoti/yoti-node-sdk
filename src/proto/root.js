const path = require('path');
const ProtoBuf = require('protobufjs');

// Hardcoded list of proto files to avoid readDirSync for edge function compatibility
const protoFiles = [
  'attribute-public-api/attrpubapi_v1/Attribute.proto',
  'attribute-public-api/attrpubapi_v1/ContentType.proto',
  'attribute-public-api/attrpubapi_v1/List.proto',
  'attribute-public-api/attrpubapi_v1/Signing.proto',
  'common-public-api/compubapi_v1/EncryptedData.proto',
  'common-public-api/compubapi_v1/SignedTimestamp.proto',
  'share-public-api/sharepubapi_v1/DataEntry.proto',
  'share-public-api/sharepubapi_v1/ExtraData.proto',
  'share-public-api/sharepubapi_v1/IssuingAttributes.proto',
  'share-public-api/sharepubapi_v1/ThirdPartyAttribute.proto',
];

const definitionsPath = path.join(__dirname, 'definitions');
const definitionsFiles = protoFiles.map((file) => path.join(definitionsPath, file));

const root = ProtoBuf.loadSync(definitionsFiles);

module.exports = root;
