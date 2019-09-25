const { ActivityDetails } = require('../../src/profile_service/activity.details');
const { Profile } = require('../../src/profile_service/profile');
const { ApplicationProfile } = require('../../src/profile_service/application.profile');
const { Attribute } = require('../../src/data_type/attribute');

describe('ActivityDetails', () => {
  describe('#getRememberMeId', () => {
    describe('when remember_me_id is available', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          remember_me_id: 'test_remember_me_id',
        },
      });
      it('should return remember_me_id value', () => {
        expect(activityDetails.getRememberMeId()).toBe('test_remember_me_id');
      });
    });
    describe('when remember_me_id is undefined', () => {
      const activityDetails = new ActivityDetails({
        receipt: {},
      });
      it('should return undefined', () => {
        expect(activityDetails.getRememberMeId()).toBe(undefined);
      });
    });
    describe('when remember_me_id is empty string', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          remember_me_id: '',
        },
      });
      it('should return empty string value', () => {
        expect(activityDetails.getRememberMeId()).toBe('');
      });
    });
  });
  describe('#getUserId', () => {
    const activityDetails = new ActivityDetails({
      receipt: {
        remember_me_id: 'test_remember_me_id',
      },
    });
    it('should return remember_me_id value', () => {
      expect(activityDetails.getUserId()).toBe('test_remember_me_id');
    });
  });
  describe('#getParentRememberMeId', () => {
    describe('when parent_remember_me_id is available', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          parent_remember_me_id: 'test_parent_remember_me_id',
        },
      });
      it('should return parent_remember_me_id value', () => {
        expect(activityDetails.getParentRememberMeId()).toBe('test_parent_remember_me_id');
      });
    });
    describe('when parent_remember_me_id is undefined', () => {
      const activityDetails = new ActivityDetails({
        receipt: {},
      });
      it('should return undefined', () => {
        expect(activityDetails.getParentRememberMeId()).toBe(undefined);
      });
    });
    describe('when parent_remember_me_id is empty string', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          parent_remember_me_id: '',
        },
      });
      it('should return empty string value', () => {
        expect(activityDetails.getParentRememberMeId()).toBe('');
      });
    });
  });
  describe('#getProfile', () => {
    const activityDetails = new ActivityDetails({}, [
      {
        extendedProfile: {
          attr_key: new Attribute({
            name: 'attr_name',
            value: 'attr_value',
          }),
        },
      },
    ]);
    it('should return Profile object', () => {
      const profile = activityDetails.getProfile();
      expect(profile).toBeInstanceOf(Profile);
      expect(profile.getAttribute('attr_key').getValue()).toBe('attr_value');
    });
  });
  describe('#getUserProfile', () => {
    const activityDetails = new ActivityDetails({}, [
      {
        attr_key: 'attr_value',
      },
    ]);
    it('should return user profile object', () => {
      expect(activityDetails.getUserProfile()).toEqual({
        attr_key: 'attr_value',
      });
    });
  });
  describe('#getApplicationProfile', () => {
    const activityDetails = new ActivityDetails({}, [], [
      {
        extendedProfile: {
          attr_key: new Attribute({
            name: 'attr_name',
            value: 'attr_value',
          }),
        },
      },
    ]);
    it('should return ApplicationProfile object', () => {
      const applicationProfile = activityDetails.getApplicationProfile();
      expect(applicationProfile).toBeInstanceOf(ApplicationProfile);
      expect(applicationProfile.getAttribute('attr_key').getValue()).toBe('attr_value');
    });
  });
  describe('#getOutcome', () => {
    const activityDetails = new ActivityDetails({
      receipt: {
        sharing_outcome: 'test_outcome',
      },
    });
    it('should return sharing_outcome value', () => {
      expect(activityDetails.getOutcome()).toBe('test_outcome');
    });
  });
  describe('#getBase64SelfieUri', () => {
    it('should return base64 encoded selfie uri', () => {
      const activityDetails = new ActivityDetails({}, [
        {
          base64SelfieUri: 'test_base64_encoded_uri',
        },
      ]);
      expect(activityDetails.getBase64SelfieUri()).toBe('test_base64_encoded_uri');
    });
  });
  describe('#getTimestamp', () => {
    const activityDetails = new ActivityDetails({
      receipt: {
        timestamp: '2003-11-04T12:51:07Z',
      },
    });
    it('should return timestamp value', () => {
      expect(activityDetails.getTimestamp().toUTCString()).toBe('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });
});
