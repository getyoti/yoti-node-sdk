export function getReceipt(token: any, pem: any, sdkId: any): Promise<any>;
/**
 * Service Class to handle interactions with the profile API
 *
 * @class ProfileService
 */
export class ProfileService {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {{apiUrl?: string}} options
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl?: string;
    });
    /** @private */
    private sdkId;
    /** @private */
    private pem;
    /** @private */
    private apiUrl;
    getReceipt(token: any): Promise<any>;
}
