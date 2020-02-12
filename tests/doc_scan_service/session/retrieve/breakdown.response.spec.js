
const BreakdownResponse = require('../../../../src/doc_scan_service/session/retrieve/breakdown.response');

describe('BreakdownResponse', () => {
  let breakdownResponse;

  beforeEach(() => {
    breakdownResponse = new BreakdownResponse({
      sub_check: 'some-sub-check',
      result: 'some-result',
      details: [{
        someDetail: 'some-value',
      }],
    });
  });

  describe('#getSubCheck', () => {
    it('should return sub check', () => {
      expect(breakdownResponse.getSubCheck()).toBe('some-sub-check');
    });
  });

  describe('#getResult', () => {
    it('should return result check', () => {
      expect(breakdownResponse.getResult()).toBe('some-result');
    });
  });

  describe('#getDetails', () => {
    it('should return array of details', () => {
      const details = breakdownResponse.getDetails();
      expect(details.length).toBe(1);
      expect(details[0].someDetail).toBe('some-value');
    });
  });
});
