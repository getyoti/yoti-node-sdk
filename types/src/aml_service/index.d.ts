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
    performAmlCheck(amlProfile: any): Promise<any>;
}
