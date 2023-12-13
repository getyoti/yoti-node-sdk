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
     * @param {Object} options
     * @param {string} options.apiUrl
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl: string;
    });
    sdkId: string;
    pem: string | Buffer;
    apiUrl: string;
    getReceipt(token: any): Promise<any>;
}
