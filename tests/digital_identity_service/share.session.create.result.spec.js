const CreateShareSessionResult = require('../../src/digital_identity_service/create.share.session.result');

describe('CreateShareSessionResult', () => {
  let createShareSessionResult;

  beforeEach(() => {
    createShareSessionResult = new CreateShareSessionResult({
      id: 'some-id',
      status: 'some-status',
      expiry: '2000-03-12',
    });
  });

  describe('#getId', () => {
    it('should return ID', () => {
      expect(createShareSessionResult.getId()).toBe('some-id');
    });
  });

  describe('#getStatus', () => {
    it('should return status', () => {
      expect(createShareSessionResult.getStatus()).toBe('some-status');
    });
  });

  describe('#getExpiry', () => {
    it('should return state', () => {
      expect(createShareSessionResult.getExpiry().toString()).toBe(new Date('2000-03-12').toString());
    });
  });
});
