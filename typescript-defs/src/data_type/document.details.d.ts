export class DocumentDetails {
    constructor(value: any);
    /**
     * @param {string} value
     *
     * @deprecated value is no longer validated using pattern.
     */
    validateData(value: string): void;
    parseFromValue(value: any): void;
    type: any;
    issuingCountry: any;
    documentNumber: any;
    expirationDate: Date;
    issuingAuthority: any;
    /**
     * Type of the document e.g. PASSPORT | DRIVING_LICENCE | NATIONAL_ID | PASS_CARD
     *
     * @returns {string}
     */
    getType(): string;
    /**
     * ISO-3166-1 alpha-3 country code, e.g. “GBR“
     *
     * @returns {string}
     */
    getIssuingCountry(): string;
    /**
     * Document number (may include letters) from the document.
     *
     * @returns {string}
     */
    getDocumentNumber(): string;
    /**
     * Expiration date of the document in Date format. If the document does not expire, this
     * field will not be present. The time part of this Date will default to 00:00:00.
     *
     * @returns {Date|null|undefined}
     */
    getExpirationDate(): Date | null | undefined;
    /**
     * Can either be a country code (for a state), or the name of the issuing authority.
     *
     * @returns {string|undefined}
     */
    getIssuingAuthority(): string | undefined;
}
