const ShareCodeFileResponse = require('../../../../src/idv_service/session/retrieve/share.code.file.response');
const ShareCodeIdPhotoResponse = require('../../../../src/idv_service/session/retrieve/share.code.id.photo.response');
const ShareCodeLookupProfileResponse = require('../../../../src/idv_service/session/retrieve/share.code.lookup.profile.response');
const ShareCodeReturnedProfileResponse = require('../../../../src/idv_service/session/retrieve/share.code.returned.profile.response');
const ShareCodeResourceResponse = require('../../../../src/idv_service/session/retrieve/share.code.resource.response');

describe('FaceCaptureResourceResponse', () => {
  let shareCodeResourceResponse;

  beforeEach(() => {
    shareCodeResourceResponse = new ShareCodeResourceResponse({
      lookup_profile: {},
      returned_profile: {},
      id_photo: {},
      file: {},
    });
  });

  describe('#getLookupProfile', () => {
    it('should return the lookupProfile', () => {
      expect(shareCodeResourceResponse.getLookupProfile()).toBeInstanceOf(
        ShareCodeLookupProfileResponse
      );
    });
  });

  describe('#getReturnedProfile', () => {
    it('should return the returnedProfile', () => {
      expect(shareCodeResourceResponse.getReturnedProfile()).toBeInstanceOf(
        ShareCodeReturnedProfileResponse
      );
    });
  });

  describe('#getIdPhoto', () => {
    it('should return the idPhoto', () => {
      expect(shareCodeResourceResponse.getIdPhoto()).toBeInstanceOf(
        ShareCodeIdPhotoResponse
      );
    });
  });

  describe('#getFile', () => {
    it('should return the file', () => {
      expect(shareCodeResourceResponse.getFile()).toBeInstanceOf(
        ShareCodeFileResponse
      );
    });
  });
});
