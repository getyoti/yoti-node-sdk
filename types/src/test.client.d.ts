export = TestClient;
/**
 * Client used for communication with the Yoti IDV service
 *
 * The {@code IDVClient} facilitates requests to the Yoti IDV service
 *
 * @class IDVClient
 */
declare class TestClient {
    /**
     * @param {string} sdkId
     * @param {string|Buffer} pem
     * @param {Object} options
     * @param {string} options.apiUrl
     */
    constructor(sdkId: string, pem: string | Buffer, { apiUrl }?: {
        apiUrl: string;
    });
    options: {
        apiUrl: string;
    };
}
