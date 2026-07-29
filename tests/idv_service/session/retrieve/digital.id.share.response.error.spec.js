const DigitalIdShareErrorResponse = require('../../../../src/idv_service/session/retrieve/digital.id.share.error.response');

describe('DigitalIdShareErrorResponse', () => {
  const rawResponse = {
    code: 'SHARE_FAILED',
    description: 'The share failed...',
  };

  let digitalIdShareErrorResponse;

  beforeEach(() => {
    digitalIdShareErrorResponse = new DigitalIdShareErrorResponse(rawResponse);
  });

  describe('#getId', () => {
    it('should return id', () => {
      expect(digitalIdShareErrorResponse.getCode()).toBe('SHARE_FAILED');
    });
  });

  describe('#getDescription', () => {
    it('should return description', () => {
      expect(digitalIdShareErrorResponse.getDescription()).toBe('The share failed...');
    });
  });
});
