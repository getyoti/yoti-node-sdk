export class Payload {
    constructor(data: any);
    data: any;
    /**
     * Get payload as a JSON string.
     *
     * @returns {string}
     */
    getPayloadJSON(): string;
    /**
     * Get payload as a Base64 string.
     *
     * @returns {string}
     */
    getBase64Payload(): string;
    /**
     * Get raw data.
     *
     * @returns {*}
     */
    getRawData(): any;
}
