export = SourceConstraintBuilder;
declare class SourceConstraintBuilder {
    /** @private */
    private anchors;
    /** @private */
    private softPreference;
    /**
     * @typedef {import('./wanted.anchor')} WantedAnchor
     * @param {WantedAnchor} anchor
     * @returns this
     */
    withAnchor(anchor: import("./wanted.anchor")): this;
    /**
     * @param {boolean} softPreference
     * @returns this
     */
    withSoftPreference(softPreference?: boolean): this;
    /**
     * @param {string} value
     * @param {string} subType
     * @returns this
     */
    withAnchorByValue(value: string, subType?: string): this;
    /**
     * @param {string} subType
     * @returns this
     */
    withPassport(subType?: string): this;
    /**
     * @param {string} subType
     * @returns this
     */
    withDrivingLicence(subType?: string): this;
    /**
     * @param {string} subType
     * @returns this
     */
    withNationalId(subType?: string): this;
    /**
     * @param {string} subType
     * @returns this
     */
    withPasscard(subType?: string): this;
    /**
     * @returns {SourceConstraint}
     */
    build(): SourceConstraint;
}
import SourceConstraint = require("./source.constraint");
