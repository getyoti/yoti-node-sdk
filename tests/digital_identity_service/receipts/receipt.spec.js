const Receipt = require('../../../src/digital_identity_service/receipts/receipt');
const ExtraData = require('../../../src/digital_identity_service/receipts/extra.data');
const AttributeIssuanceDetails = require('../../../src/data_type/attribute.issuance.details');
const UserContent = require('../../../src/digital_identity_service/receipts/user.content');
const UserProfile = require('../../../src/digital_identity_service/receipts/user.profile');

describe('Receipt', () => {
  describe('#getSessionId', () => {
    describe('when sessionId is available', () => {
      it('should return the sessionId value', () => {
        const receipt = new Receipt({
          sessionId: 'test_session_id',
        });

        expect(receipt.getSessionId()).toEqual('test_session_id');
      });
    });
    describe('when sessionId is undefined', () => {
      it('should return undefined', () => {
        const receipt = new Receipt({});
        expect(receipt.getSessionId()).toBe(undefined);
      });
    });
  });
  describe('#getRememberMeId', () => {
    describe('when rememberMeId is available', () => {
      it('should return rememberMeId value', () => {
        const activityDetails = new Receipt({
          rememberMeId: 'test_remember_me_id',
        });
        expect(activityDetails.getRememberMeId()).toBe('test_remember_me_id');
      });
    });
    describe('when rememberMeId is undefined', () => {
      it('should return undefined', () => {
        const activityDetails = new Receipt({
        });
        expect(activityDetails.getRememberMeId()).toBe(undefined);
      });
    });
    describe('when rememberMeId is empty string', () => {
      it('should return empty string value', () => {
        const activityDetails = new Receipt({
          rememberMeId: '',
        });
        expect(activityDetails.getRememberMeId()).toBe('');
      });
    });
  });
  describe('#getParentRememberMeId', () => {
    describe('when parentRememberMeId is available', () => {
      it('should return parentRememberMeId value', () => {
        const activityDetails = new Receipt({
          parentRememberMeId: 'test_parent_remember_me_id',
        });
        expect(activityDetails.getParentRememberMeId()).toBe('test_parent_remember_me_id');
      });
    });
    describe('when parentRememberMeId is undefined', () => {
      it('should return undefined', () => {
        const activityDetails = new Receipt({
        });
        expect(activityDetails.getParentRememberMeId()).toBe(undefined);
      });
    });
    describe('when parentRememberMeId is empty string', () => {
      it('should return empty string value', () => {
        const activityDetails = new Receipt({
          parentRememberMeId: '',
        });
        expect(activityDetails.getParentRememberMeId()).toBe('');
      });
    });
  });
  describe('#getProfile', () => {
    it('should return Profile object', () => {
      const activityDetails = new Receipt({}, new UserContent([
        {
          name: 'attr_name',
          value: 'attr_value',
        },
      ]));
      const profile = activityDetails.getProfile();
      expect(profile).toBeInstanceOf(UserProfile);
      expect(profile.getAttribute('attr_name').getValue()).toBe('attr_value');
    });
  });
  describe('#getExtraData', () => {
    it('should return extraData', () => {
      const extraData = [
        new AttributeIssuanceDetails('some_token', new Date()),
      ];

      const activityDetails = new Receipt({}, new UserContent([], extraData));
      expect(activityDetails.getExtraData()).toBeInstanceOf(ExtraData);
      expect(activityDetails.getExtraData().getAttributeIssuanceDetails()).toEqual(extraData[0]);
    });
  });
  describe('#getError', () => {
    it('should return error value', () => {
      const error = 'MANDATORY_DOCUMENT_NOT_PROVIDED';

      const activityDetails = new Receipt({
        error,
      });

      expect(activityDetails.getError()).toEqual(error);
    });
  });
  describe('#getTimestamp', () => {
    it('should return timestamp value', () => {
      const activityDetails = new Receipt({
        timestamp: '2003-11-04T12:51:07Z',
      });
      expect(activityDetails.getTimestamp().toUTCString()).toBe('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });
  describe('#getReceiptId', () => {
    it('should return receipt ID', () => {
      const receiptId = 'test_receipt_id';

      const activityDetails = new Receipt({
        id: receiptId,
      });
      expect(activityDetails.getReceiptId()).toBe(receiptId);
    });
  });
});
