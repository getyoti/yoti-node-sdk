const DetailsResponse = require('../../../../src/doc_scan_service/session/retrieve/details.response');

describe('DetailsResponse', () => {
  let detailsResponse;

  beforeEach(() => {
    detailsResponse = new DetailsResponse({
      name: 'some-name',
      value: 'some-value',
    });
  });

  describe('#getName', () => {
    it('should return name', () => {
      expect(detailsResponse.getName()).toBe('some-name');
    });
  });

  describe('#getResult', () => {
    it('should return result', () => {
      expect(detailsResponse.getValue()).toBe('some-value');
    });
  });
});
