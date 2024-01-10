/**
 * - defined in forge, see X.509v3 RSA certificate (mocked here)
 */
export type Certificate = {
    version: number;
    serialNumber: string;
    extensions: any[];
};
export type AnchorsGroup = {
    sources: [];
    verifiers: [];
    unknown: [];
};
/**
 * Creates anchor list from certificates.
 *
 * @class AnchorProcessor
 */
export class AnchorProcessor {
    /**
     * Extract matching Attribute Anchors from list.
     *
     * @param anchors
     *
     * @returns {Object.<string, YotiAnchor[]>}
     */
    static process(anchors: any): {
        [x: string]: YotiAnchor[];
    };
    /**
     * Get an anchor from certificate list.
     *
     * @param {Array} certificatesList
     * @param {YotiSignedTimeStamp} signedTimestamp
     * @param {Buffer[]} originServerCerts
     * @param {string} subType
     *
     * @returns {YotiAnchor}
     */
    static getAnchorFromCerts(certificatesList: any[], signedTimestamp: YotiSignedTimeStamp, originServerCerts: Buffer[], subType: string): YotiAnchor;
    /**
     * Return YotiAnchors list from a protobuf anchor.
     *
     * @deprecated no longer in use.
     *
     * @param {Object} anchorObj
     *
     * @returns {Object.<string, YotiAnchor[]>}
     */
    static processSingleAnchor(anchorObj: any): {
        [x: string]: YotiAnchor[];
    };
    /**
     * Get anchors from a single certificate.
     *
     * @deprecated no longer in use.
     *
     * @param {Buffer} certArrayBuffer
     * @param {YotiSignedTimeStamp} signedTimestamp
     * @param {Buffer[]} originServerCerts
     * @param {string} subType
     *
     * @returns {Object.<string, YotiAnchor[]>}
     */
    static getAnchorsByCertificate(certArrayBuffer: Buffer, subType: string, signedTimestamp: YotiSignedTimeStamp, originServerCerts: Buffer[]): {
        [x: string]: YotiAnchor[];
    };
    /**
     * Return YotiAnchor object for provided oid.
     *
     * @deprecated no longer in use.
     *
     * @param {Array} extensionsData
     * @param {string} subType
     * @param {YotiSignedTimeStamp} signedTimestamp
     * @param {Buffer[]} originServerCerts
     * @param {string} oid
     *
     * @returns {YotiAnchor|null}
     */
    static getAnchorByOid(extensionsData: any[], subType: string, signedTimestamp: YotiSignedTimeStamp, originServerCerts: Buffer[], oid: string): YotiAnchor | null;
    /**
     * Return Anchor value.
     *
     * @deprecated no longer in use.
     *
     * @param {Array} extensionsData
     * @param {string} oid
     *
     * @returns {string}
     */
    static getAnchorValueByOid(extensionsData: any[], oid: string): string;
    /**
     * Return extension for given oid.
     *
     * @param {Array} extensionsData
     * @param {string} oid
     *
     * @returns {Object|null}
     */
    static getExtensionByOid(extensionsData: any[], oid: string): any | null;
    /**
     * Return Yoti signedTimestamp.
     *
     * @param {Buffer} signedTimestampBuffer
     *
     * @returns {YotiSignedTimeStamp}
     */
    static processSignedTimeStamp(signedTimestampBuffer: Buffer): YotiSignedTimeStamp;
    /**
     * Merge arrays by anchor type.
     *
     * @deprecated no longer in use.
     *
     * @param {AnchorsGroup} targetList
     * @param {AnchorsGroup} sourceList
     * @returns {AnchorsGroup}
     */
    static mergeAnchorsLists(targetList: AnchorsGroup, sourceList: AnchorsGroup): AnchorsGroup;
    /**
     * Convert certificate list to a list of X509 certificates.
     *
     * @param {Buffer[]} certificatesList
     *
     * @returns {Buffer[]}
     */
    static convertCertsListToX509(certificatesList: Buffer[]): Buffer[];
    /**
     * Convert certificate from byte arrays to X509 certificate.
     *
     * @param {Buffer} certArrayBuffer
     *
     */
    static convertCertToX509(certArrayBuffer: Buffer): any;
    /**
     * Returns the elem index or -1 if it doesn't find any.
     *
     * @param {Array} array
     * @param {Object} anchorOidObj
     *
     * @returns {number}
     */
    static findOidIndex(array: any[], anchorOidObj: any): number;
    /**
     * @returns {Object.<string, Array>}
     */
    static getResultFormat(): {
        [x: string]: any[];
    };
    /**
     * Map of anchor list keys to oids.
     *
     * @returns {Object}
     */
    static getAnchorTypesMap(): any;
    /**
     * Get anchor list key by type.
     *
     * @param {string} type
     */
    static getAnchorListKeyByType(type: string): string;
    /**
     * Get anchor type by oid.
     *
     * @param {string} oid
     */
    static getAnchorTypeByOid(oid: string): string;
    /**
     * List of anchor list keys.
     *
     * @returns {string[]}
     */
    static getAnchorTypes(): string[];
}
import { YotiAnchor } from "../data_type/anchor";
import { YotiSignedTimeStamp } from "../data_type/signed.timestamp";
