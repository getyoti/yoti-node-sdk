const expect = require('chai').expect;
const { ActivityDetails } = require('../../src/profile_service/activity.details');
const { Profile } = require('../../src/profile_service/profile');
const { ApplicationProfile } = require('../../src/profile_service/application.profile');
const { Attribute } = require('../../src/data_type/attribute');

describe('ActivityDetails', () => {
  describe('#getRememberMeId', () => {
    context('when remember_me_id is available', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          remember_me_id: 'test_remember_me_id',
        },
      });
      it('should return remember_me_id value', () => {
        expect(activityDetails.getRememberMeId()).to.equal('test_remember_me_id');
      });
    });
    context('when remember_me_id is undefined', () => {
      const activityDetails = new ActivityDetails({
        receipt: {},
      });
      it('should return undefined', () => {
        expect(activityDetails.getRememberMeId()).to.equal(undefined);
      });
    });
    context('when remember_me_id is empty string', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          remember_me_id: '',
        },
      });
      it('should return empty string value', () => {
        expect(activityDetails.getRememberMeId()).to.equal('');
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
      expect(activityDetails.getUserId()).to.equal('test_remember_me_id');
    });
  });
  describe('#getParentRememberMeId', () => {
    context('when parent_remember_me_id is available', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          parent_remember_me_id: 'test_parent_remember_me_id',
        },
      });
      it('should return parent_remember_me_id value', () => {
        expect(activityDetails.getParentRememberMeId()).to.equal('test_parent_remember_me_id');
      });
    });
    context('when parent_remember_me_id is undefined', () => {
      const activityDetails = new ActivityDetails({
        receipt: {},
      });
      it('should return undefined', () => {
        expect(activityDetails.getParentRememberMeId()).to.equal(undefined);
      });
    });
    context('when parent_remember_me_id is empty string', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          parent_remember_me_id: '',
        },
      });
      it('should return empty string value', () => {
        expect(activityDetails.getParentRememberMeId()).to.equal('');
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
      expect(profile).to.be.instanceOf(Profile);
      expect(profile.getAttribute('attr_key').getValue()).to.equal('attr_value');
    });
  });
  describe('#getUserProfile', () => {
    const activityDetails = new ActivityDetails({}, [
      {
        attr_key: 'attr_value',
      },
    ]);
    it('should return user profile object', () => {
      expect(activityDetails.getUserProfile()).to.eql({
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
      expect(applicationProfile).to.be.instanceOf(ApplicationProfile);
      expect(applicationProfile.getAttribute('attr_key').getValue()).to.equal('attr_value');
    });
  });
  describe('#getOutcome', () => {
    const activityDetails = new ActivityDetails({
      receipt: {
        sharing_outcome: 'test_outcome',
      },
    });
    it('should return sharing_outcome value', () => {
      expect(activityDetails.getOutcome()).to.equal('test_outcome');
    });
  });
  describe('#getBase64SelfieUri', () => {
    it('should return base64 encoded selfie uri', () => {
      const activityDetails = new ActivityDetails({}, [
        {
          base64SelfieUri: 'test_base64_encoded_uri',
        },
      ]);
      expect(activityDetails.getBase64SelfieUri()).to.equal('test_base64_encoded_uri');
    });
  });
});
