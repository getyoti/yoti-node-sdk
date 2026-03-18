'use strict';

const Validation = require('../../../yoti_common/validation');
const ShareCodeLookupProfileResponse = require('./share.code.lookup.profile.response');
const ShareCodeReturnedProfileResponse = require('./share.code.returned.profile.response');
const ShareCodeIdPhotoResponse = require('./share.code.id.photo.response');
const ShareCodeFileResponse = require('./share.code.file.response');
const ResourceResponse = require('./resource.response');

class ShareCodeResourceResponse extends ResourceResponse {
  constructor(resource) {
    super(resource);

    if (resource.lookup_profile) {
      Validation.isPlainObject(resource.lookup_profile, 'lookup_profile');
      /** @private */
      this.lookupProfile = new ShareCodeLookupProfileResponse(resource.lookup_profile);
    }

    if (resource.returned_profile) {
      Validation.isPlainObject(resource.returned_profile, 'returned_profile');
      /** @private */
      this.returnedProfile = new ShareCodeReturnedProfileResponse(resource.returned_profile);
    }

    if (resource.id_photo) {
      Validation.isPlainObject(resource.id_photo, 'id_photo');
      /** @private */
      this.idPhoto = new ShareCodeIdPhotoResponse(resource.id_photo);
    }

    if (resource.file) {
      Validation.isPlainObject(resource.file, 'file');
      /** @private */
      this.file = new ShareCodeFileResponse(resource.file);
    }
  }

  /**
   * @return ShareCodeLookupProfileResponse
   */
  getLookupProfile() {
    return this.lookupProfile;
  }

  /**
   * @return ShareCodeReturnedProfileResponse
   */
  getReturnedProfile() {
    return this.returnedProfile;
  }

  /**
   * @return ShareCodeIdPhotoResponse
   */
  getIdPhoto() {
    return this.idPhoto;
  }

  /**
   * @return ShareCodeFileResponse
   */
  getFile() {
    return this.file;
  }
}

module.exports = ShareCodeResourceResponse;
