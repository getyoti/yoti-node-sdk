'use strict';

const protoRoot = require('../proto-root');

const protoInst = protoRoot.initializeProtoBufObjects();

const { YotiDate } = require('../data_type/date');
const AttributeIssuanceDetails = require('../data_type/attribute.issuance.details');
const AttributeDefinition = require('../data_type/attribute.definition');

class ThirdPartyAttributeConverter {
  static convertThirdPartyAttribute(protoBytes) {
    let thirdPartyProto;
    try {
      thirdPartyProto = protoInst.decodeThirdPartyAttribute(protoBytes);
    } catch (err) {
      console.log(`Failed to load ThirdPartyAttribute: ${err}`);
      return undefined;
    }

    const token = thirdPartyProto.issuanceToken.toString('base64');
    if (!token || token === '') {
      console.log('Failed to retrieve token from ThirdPartyAttribute');
      return undefined;
    }

    const issuingAttributes = thirdPartyProto.issuingAttributes;
    let expiryDate;
    let attributes;

    if (issuingAttributes) {
      try {
        const tmpExpiryDate = issuingAttributes.expiryDate;
        expiryDate = YotiDate.fromDateString(tmpExpiryDate);
      } catch (err) {
        console.log(`Failed to retrieve/parse expiryDate from ThirdPartyAttribute: ${err}`);
      }
      attributes = issuingAttributes.definitions.map((a) => new AttributeDefinition(a.name));
    }

    return new AttributeIssuanceDetails(token, expiryDate, attributes);
  }
}

module.exports = ThirdPartyAttributeConverter;
