const { ActivityDetails } = require('../../src/profile_service/activity.details');
const { Profile } = require('../../src/profile_service/profile');
const { ApplicationProfile } = require('../../src/profile_service/application.profile');

describe('ActivityDetails', () => {
  describe('#getRememberMeId', () => {
    describe('when remember_me_id is available', () => {
      it('should return remember_me_id value', () => {
        const activityDetails = new ActivityDetails({
          receipt: {
            remember_me_id: 'test_remember_me_id',
          },
        });
        expect(activityDetails.getRememberMeId()).toBe('test_remember_me_id');
      });
    });
    describe('when remember_me_id is undefined', () => {
      it('should return undefined', () => {
        const activityDetails = new ActivityDetails({
          receipt: {},
        });
        expect(activityDetails.getRememberMeId()).toBe(undefined);
      });
    });
    describe('when remember_me_id is empty string', () => {
      it('should return empty string value', () => {
        const activityDetails = new ActivityDetails({
          receipt: {
            remember_me_id: '',
          },
        });
        expect(activityDetails.getRememberMeId()).toBe('');
      });
    });
  });
  describe('#getParentRememberMeId', () => {
    describe('when parent_remember_me_id is available', () => {
      it('should return parent_remember_me_id value', () => {
        const activityDetails = new ActivityDetails({
          receipt: {
            parent_remember_me_id: 'test_parent_remember_me_id',
          },
        });
        expect(activityDetails.getParentRememberMeId()).toBe('test_parent_remember_me_id');
      });
    });
    describe('when parent_remember_me_id is undefined', () => {
      it('should return undefined', () => {
        const activityDetails = new ActivityDetails({
          receipt: {},
        });
        expect(activityDetails.getParentRememberMeId()).toBe(undefined);
      });
    });
    describe('when parent_remember_me_id is empty string', () => {
      it('should return empty string value', () => {
        const activityDetails = new ActivityDetails({
          receipt: {
            parent_remember_me_id: '',
          },
        });
        expect(activityDetails.getParentRememberMeId()).toBe('');
      });
    });
  });
  describe('#getProfile', () => {
    it('should return Profile object', () => {
      const activityDetails = new ActivityDetails({}, {
        attributes: [
          {
            name: 'attr_name',
            value: 'attr_value',
          },
        ],
      });
      const profile = activityDetails.getProfile();
      expect(profile).toBeInstanceOf(Profile);
      expect(profile.getAttribute('attr_name').getValue()).toBe('attr_value');
    });
  });
  describe('#getApplicationProfile', () => {
    it('should return ApplicationProfile object', () => {
      const activityDetails = new ActivityDetails(
        {},
        [],
        {
          attributes: [
            {
              name: 'attr_name',
              value: 'attr_value',
            },
          ],
        }
      );
      const applicationProfile = activityDetails.getApplicationProfile();
      expect(applicationProfile).toBeInstanceOf(ApplicationProfile);
      expect(applicationProfile.getAttribute('attr_name').getValue()).toBe('attr_value');
    });
  });
  describe('#getOutcome', () => {
    it('should return sharing_outcome value', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          sharing_outcome: 'test_outcome',
        },
      });
      expect(activityDetails.getOutcome()).toBe('test_outcome');
    });
  });
  describe('#getErrorDetails', () => {
    it('should return error_details value', () => {
      const activityDetails = new ActivityDetails({
        error_details: {
          error_code: 'ERROR_CODE_FOR_SHARE',
          description: 'Something terrible happened...users had no documents!',
        },
        receipt: {
          sharing_outcome: 'NOT_SUCCESS',
        },
      });
      expect(activityDetails.getErrorDetails()).toEqual({
        errorCode: 'ERROR_CODE_FOR_SHARE',
        description: 'Something terrible happened...users had no documents!',
      });
    });
    it('should return error_details value with "errorReason" when available', () => {
      const activityDetails = new ActivityDetails({
        error_details: {
          error_code: 'ERROR_CODE_FOR_SHARE',
          description: 'Something terrible happened...users had no documents!',
          error_reason: {
            requirements_not_met_details: [
              {
                failure_type: 'ID_DOCUMENT_EXTRACTION',
                document_type: 'PASSPORT',
                document_country_iso_code: 'GBR',
                audit_id: 'audit-123',
                details: 'something not right',
              },
              {
                failure_type: 'ID_DOCUMENT_AUTHENTICITY',
                document_type: 'PASSPORT',
                document_country_iso_code: 'GBR',
                audit_id: 'audit-456',
                details: 'something still not right',
              },
            ],
          },
        },
        receipt: {
          sharing_outcome: 'NOT_SUCCESS',
        },
      });
      expect(activityDetails.getErrorDetails()).toEqual({
        errorCode: 'ERROR_CODE_FOR_SHARE',
        description: 'Something terrible happened...users had no documents!',
        errorReason: expect.objectContaining({
          requirementsNotMetDetails: expect.arrayContaining([
            expect.objectContaining({
              failureType: 'ID_DOCUMENT_EXTRACTION',
              documentType: 'PASSPORT',
              documentCountryIsoCode: 'GBR',
              auditId: 'audit-123',
              details: 'something not right',
            }),
            expect.objectContaining({
              failureType: 'ID_DOCUMENT_AUTHENTICITY',
              documentType: 'PASSPORT',
              documentCountryIsoCode: 'GBR',
              auditId: 'audit-456',
              details: 'something still not right',
            }),
          ]),
        }),
      });
    });
  });
  describe('#getTimestamp', () => {
    it('should return timestamp value', () => {
      const activityDetails = new ActivityDetails({
        receipt: {
          timestamp: '2003-11-04T12:51:07Z',
        },
      });
      expect(activityDetails.getTimestamp().toUTCString()).toBe('Tue, 04 Nov 2003 12:51:07 GMT');
    });
  });
});
