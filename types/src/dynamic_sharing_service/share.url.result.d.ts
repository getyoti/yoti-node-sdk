export = ShareUrlResult;
declare class ShareUrlResult {
    /**
     * @param {Object} response
     */
    constructor(response: any);
    shareUrl: any;
    refId: any;
    /**
     * The URL that the 3rd party should use for the share.
     *
     * @returns {string} The share URL
     */
    getShareUrl(): string;
    /**
     * Get the Yoti reference id for the share.
     *
     * @returns {string} reference id for the share
     */
    getRefId(): string;
}
