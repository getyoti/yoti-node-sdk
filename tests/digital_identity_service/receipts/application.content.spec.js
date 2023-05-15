'use strict';

jest.mock('../../../src/digital_identity_service/receipts/application.profile');
jest.mock('../../../src/digital_identity_service/receipts/extra.data');

const ApplicationContent = require('../../../src/digital_identity_service/receipts/application.content');
const ApplicationProfile = require('../../../src/digital_identity_service/receipts/application.profile');
const ExtraData = require('../../../src/digital_identity_service/receipts/extra.data');

describe('ApplicationContent', () => {
  describe('#constructing new ApplicationContent', () => {
    it('should create an instance property applicationProfile and extraData', () => {
      const attributesContent = [];
      const extraDataContent = [];

      const applicationContent = new ApplicationContent(attributesContent, extraDataContent);

      expect(applicationContent.getProfile()).toBeInstanceOf(ApplicationProfile);
      expect(ApplicationProfile).toHaveBeenCalledTimes(1);
      expect(ApplicationProfile).toHaveBeenCalledWith(attributesContent);
      expect(applicationContent.getExtraData()).toBeInstanceOf(ExtraData);
      expect(ExtraData).toHaveBeenCalledTimes(1);
      expect(ExtraData).toHaveBeenCalledWith(extraDataContent);
    });
  });
});
