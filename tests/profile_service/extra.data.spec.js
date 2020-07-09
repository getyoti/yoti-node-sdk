'use strict';

const AttributeIssuanceDetails = require('../../src/data_type/attribute.issuance.details');
const ExtraData = require('../../src/profile_service/extra.data');

describe('ExtraData', () => {
  describe('#getAttributeIssuanceDetails', () => {
    it('should return the first attribute issuance details', () => {
      const dataEntries = [
        new AttributeIssuanceDetails('someFirstToken'),
        new AttributeIssuanceDetails('someSecondToken'),
      ];

      const extraData = new ExtraData(dataEntries);

      const attributeIssuanceDetails = extraData.getAttributeIssuanceDetails();
      expect(attributeIssuanceDetails.getToken()).toEqual('someFirstToken');
    });

    it('should return undefined when there are no ThirdPartyAttributes', () => {
      const extraData = new ExtraData([]);

      const attributeIssuanceDetails = extraData.getAttributeIssuanceDetails();
      expect(attributeIssuanceDetails).toBe(undefined);
    });
  });
});
