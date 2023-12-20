export = SourceConstraintBuilder;
declare class SourceConstraintBuilder {
    anchors: any[];
    softPreference: boolean;
    /**
     * @param {WantedAnchor} anchor
     */
    withAnchor(anchor: WantedAnchor): this;
    /**
     * @param {boolean} softPreference
     */
    withSoftPreference(softPreference?: boolean): this;
    /**
     * @param {string} value
     * @param {string} subType
     */
    withAnchorByValue(value: string, subType?: string): this;
    /**
     * @param {string} subType
     */
    withPassport(subType?: string): this;
    /**
     * @param {string} subType
     */
    withDrivingLicence(subType?: string): this;
    /**
     * @param {string} subType
     */
    withNationalId(subType?: string): this;
    /**
     * @param {string} subType
     */
    withPasscard(subType?: string): this;
    /**
     * @returns {SourceConstraint}
     */
    build(): SourceConstraint;
}
import SourceConstraint = require("./source.constraint");
