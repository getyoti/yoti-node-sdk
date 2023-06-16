'use strict';

const fs = require('fs');
const ExtraDataConverter = require('../../../src/yoti_common/converters/extra.data.converter');
const { YotiDate } = require('../../../src/data_type/date');

const sampleExtraData = fs.readFileSync('./tests/sample-data/fixtures/extra_data/valid_extra_data.txt', 'utf8');

describe('ExtraDataConverter', () => {
  describe('#convertExtraData', () => {
    it('should parse valid extra data', () => {
      const extraData = ExtraDataConverter.convertExtraData(sampleExtraData);

      expect(extraData).not.toBe(undefined);
      expect(Array.isArray(extraData)).toBe(true);
      expect(extraData).toHaveLength(1);

      const attributeIssuanceDetails = extraData[0];

      expect(attributeIssuanceDetails).not.toBe(undefined);
      expect(attributeIssuanceDetails.getToken()).toEqual('c29tZUlzc3VhbmNlVG9rZW4=');
      expect(attributeIssuanceDetails.getExpiryDate()).toBeInstanceOf(YotiDate);
      expect(attributeIssuanceDetails.getIssuingAttributes().length).toEqual(2);
      expect(attributeIssuanceDetails.getIssuingAttributes()[0].getName()).toEqual('com.thirdparty.id');
      expect(attributeIssuanceDetails.getIssuingAttributes()[1].getName()).toEqual('com.thirdparty.other_id');

      expect(attributeIssuanceDetails.getExpiryDate()
        .getMicrosecondTimestamp()).toBe('2019-10-15T22:04:05.123000Z');
    });

    it('should return undefined when failing to parse', () => {
      const extraData = ExtraDataConverter.convertExtraData(Buffer.from('someRandomData'));

      expect(extraData).toBe(undefined);
    });
  });
});
