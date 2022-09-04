const attributeList = require('./proto.attribute.list');
const multiValue = require('./proto.multi.value');
const encryptedData = require('./proto.common.encrypted-data');
const extraData = require('./proto.share.extra-data');
const thirdPartyAttribute = require('./proto.share.third-party-attribute');
const signedTimestamp = require('./proto.signed.timestamp');

module.exports = {
  ...attributeList,
  ...multiValue,
  ...encryptedData,
  ...extraData,
  ...thirdPartyAttribute,
  ...signedTimestamp,
};
