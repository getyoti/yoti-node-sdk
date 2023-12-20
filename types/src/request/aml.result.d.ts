export class AmlResult {
    /**
     * Check if all expected attributes are included in the result.
     *
     * @param rawResult
     */
    static checkAttributes(rawResult: any): void;
    /**
     * Process and extract the error message sent from Connect API
     *
     * @param Error
     *
     * @returns {string}
     */
    static processAmlError(Error: any): string;
}
