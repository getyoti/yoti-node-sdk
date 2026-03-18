export = ShareCodeReturnedProfileResponse;
declare class ShareCodeReturnedProfileResponse {
    constructor(returnedProfile: any);
    /** @private */
    private media;
    /**
     * @return MediaResponse
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
