export = SourceConstraintBuilder;
declare class SourceConstraintBuilder {
    anchors: any[];
    softPreference: boolean;
    /**
     * @param {WantedAnchor} anchor
     */
    withAnchor(anchor: any): import("./source.constraint.builder");
    /**
     * @param {boolean} softPreference
     */
    withSoftPreference(softPreference?: boolean): import("./source.constraint.builder");
    /**
     * @param {string} value
     * @param {string} subType
     */
    withAnchorByValue(value: string, subType?: string): import("./source.constraint.builder");
    /**
     * @param {string} subType
     */
    withPassport(subType?: string): import("./source.constraint.builder");
    /**
     * @param {string} subType
     */
    withDrivingLicence(subType?: string): import("./source.constraint.builder");
    /**
     * @param {string} subType
     */
    withNationalId(subType?: string): import("./source.constraint.builder");
    /**
     * @param {string} subType
     */
    withPasscard(subType?: string): import("./source.constraint.builder");
    /**
     * @returns {SourceConstraint}
     */
    build(): SourceConstraint;
}
import SourceConstraint = require("./source.constraint");
