export = SourceConstraintBuilder;
declare class SourceConstraintBuilder {
    /** @private */
    private anchors;
    /** @private */
    private softPreference;
    /**
     * @typedef {import('./wanted.anchor')} WantedAnchor
     *
     * @param {WantedAnchor} anchor
     */
    withAnchor(anchor: import("./wanted.anchor")): this;
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
