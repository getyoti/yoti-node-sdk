'use strict';

jest.mock('../../../src/digital_identity_service/receipts/user.profile');
jest.mock('../../../src/digital_identity_service/receipts/extra.data');

const UserContent = require('../../../src/digital_identity_service/receipts/user.content');
const UserProfile = require('../../../src/digital_identity_service/receipts/user.profile');
const ExtraData = require('../../../src/digital_identity_service/receipts/extra.data');

describe('UserContent', () => {
  describe('#constructing new UserContent', () => {
    it('should create an instance property UserProfile and extraData', () => {
      const attributesContent = [];
      const extraDataContent = [];

      const userContent = new UserContent(attributesContent, extraDataContent);

      expect(userContent.getProfile()).toBeInstanceOf(UserProfile);
      expect(UserProfile).toHaveBeenCalledTimes(1);
      expect(UserProfile).toHaveBeenCalledWith(attributesContent);
      expect(userContent.getExtraData()).toBeInstanceOf(ExtraData);
      expect(ExtraData).toHaveBeenCalledTimes(1);
      expect(ExtraData).toHaveBeenCalledWith(extraDataContent);
    });
  });
});
