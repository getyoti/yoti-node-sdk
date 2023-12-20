export function performAmlCheck(amlProfile: any, pem: any, sdkId: any): Promise<any>;
/**
 * Service Class to handle interactions with the aml API
 *
 * @class AmlService
 */
export class AmlService {
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
    performAmlCheck(amlProfile: any): Promise<any>;
}
