export = ShareCodeResourceResponse;
declare class ShareCodeResourceResponse extends ResourceResponse {
    /** @private */
    private lookupProfile;
    /** @private */
    private returnedProfile;
    /** @private */
    private idPhoto;
    /** @private */
    private file;
    /**
     * @return ShareCodeLookupProfileResponse
     */
    getLookupProfile(): ShareCodeLookupProfileResponse;
    /**
     * @return ShareCodeReturnedProfileResponse
     */
    getReturnedProfile(): ShareCodeReturnedProfileResponse;
    /**
     * @return ShareCodeIdPhotoResponse
     */
    getIdPhoto(): ShareCodeIdPhotoResponse;
    /**
     * @return ShareCodeFileResponse
     */
    getFile(): ShareCodeFileResponse;
}
import ResourceResponse = require("./resource.response");
import ShareCodeLookupProfileResponse = require("./share.code.lookup.profile.response");
import ShareCodeReturnedProfileResponse = require("./share.code.returned.profile.response");
import ShareCodeIdPhotoResponse = require("./share.code.id.photo.response");
import ShareCodeFileResponse = require("./share.code.file.response");
