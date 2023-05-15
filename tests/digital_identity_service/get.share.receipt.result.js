const GetShareReceiptResult = require('../../src/digital_identity_service/get.share.receipt.result');
const ExtraData = require('../../src/digital_identity_service/receipts/extra.data');
const AttributeIssuanceDetails = require('../../src/data_type/attribute.issuance.details');
const UserContent = require('../../src/digital_identity_service/receipts/user.content');
const UserProfile = require('../../src/digital_identity_service/receipts/user.profile');

describe('GetShareReceiptResult', () => {
  describe('#getSessionId', () => {
    describe('when sessionId is available', () => {
      it('should return the sessionId value', () => {
        const receipt = new GetShareReceiptResult({
          sessionId: 'test_session_id',
        });

        expect(receipt.getSessionId()).toEqual('test_session_id');
      });
    });
    describe('when sessionId is undefined', () => {
      it('should return undefined', () => {
        const receipt = new GetShareReceiptResult({});
        expect(receipt.getSessionId()).toBe(undefined);
      });
    });
  });
  describe('#getRememberMeId', () => {
    describe('when rememberMeId is available', () => {
      it('should return rememberMeId value', () => {
        const getShareReceiptResult = new GetShareReceiptResult({
          rememberMeId: 'test_remember_me_id',
        });
        expect(getShareReceiptResult.getRememberMeId()).toBe('test_remember_me_id');
      });
    });
    describe('when rememberMeId is undefined', () => {
      it('should return undefined', () => {
        const getShareReceiptResult = new GetShareReceiptResult({
        });
        expect(getShareReceiptResult.getRememberMeId()).toBe(undefined);
      });
    });
    describe('when rememberMeId is empty string', () => {
      it('should return empty string value', () => {
        const getShareReceiptResult = new GetShareReceiptResult({
          rememberMeId: '',
        });
        expect(getShareReceiptResult.getRememberMeId()).toBe('');
      });
    });
  });
  describe('#getParentRememberMeId', () => {
    describe('when parentRememberMeId is available', () => {
      it('should return parentRememberMeId value', () => {
        const getShareReceiptResult = new GetShareReceiptResult({
          parentRememberMeId: 'test_parent_remember_me_id',
        });
        expect(getShareReceiptResult.getParentRememberMeId()).toBe('test_parent_remember_me_id');
      });
    });
    describe('when parentRememberMeId is undefined', () => {
      it('should return undefined', () => {
        const getShareReceiptResult = new GetShareReceiptResult({
        });
        expect(getShareReceiptResult.getParentRememberMeId()).toBe(undefined);
      });
    });
    describe('when parentRememberMeId is empty string', () => {
      it('should return empty string value', () => {
        const getShareReceiptResult = new GetShareReceiptResult({
          parentRememberMeId: '',
        });
        expect(getShareReceiptResult.getParentRememberMeId()).toBe('');
      });
    });
  });
  describe('#getProfile', () => {
    it('should return Profile object', () => {
      const getShareReceiptResult = new GetShareReceiptResult({}, new UserContent([
        {
          name: 'attr_name',
          value: 'attr_value',
        },
      ]));
      const profile = getShareReceiptResult.getProfile();
      expect(profile).toBeInstanceOf(UserProfile);
      expect(profile.getAttribute('attr_name').getValue()).toBe('attr_value');
    });
  });
  describe('#getExtraData', () => {
    it('should return extraData', () => {
      const extraData = [
        new AttributeIssuanceDetails('some_token', new Date()),
      ];

      const getShareReceiptResult = new GetShareReceiptResult({}, new UserContent([], extraData));
      expect(getShareReceiptResult.getExtraData()).toBeInstanceOf(ExtraData);
      expect(getShareReceiptResult.getExtraData().getAttributeIssuanceDetails())
        .toEqual(extraData[0]);
    });
  });
  describe('#getError', () => {
    it('should return error value', () => {
      const error = 'MANDATORY_DOCUMENT_NOT_PROVIDED';

      const getShareReceiptResult = new GetShareReceiptResult({
        error,
      });

      expect(getShareReceiptResult.getError()).toEqual(error);
    });
  });
  describe('#getTimestamp', () => {
    it('should return timestamp value', () => {
      const getShareReceiptResult = new GetShareReceiptResult({
        timestamp: '2003-11-04T12:51:07Z',
      });
      expect(getShareReceiptResult.getTimestamp().toUTCString()).toBe('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });
  describe('#getReceiptId', () => {
    it('should return receipt ID', () => {
      const receiptId = 'test_receipt_id';

      const getShareReceiptResult = new GetShareReceiptResult({
        id: receiptId,
      });
      expect(getShareReceiptResult.getReceiptId()).toBe(receiptId);
    });
  });
});
