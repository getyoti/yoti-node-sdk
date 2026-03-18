export = ShareCodeIdPhotoResponse;
declare class ShareCodeIdPhotoResponse {
    constructor(idPhoto: any);
    /** @private */
    private media;
    /**
     * @return MediaResponse
     */
    getMedia(): MediaResponse;
}
import MediaResponse = require("./media.response");
