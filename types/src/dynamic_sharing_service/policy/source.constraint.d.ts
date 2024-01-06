export = SourceConstraint;
declare class SourceConstraint {
    /**
     * @param {WantedAnchor[]} anchors
     * @param {boolean} softPreference
     */
    constructor(anchors: WantedAnchor[], softPreference?: boolean);
    /** @private */
    private anchors;
    /** @private */
    private softPreference;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import WantedAnchor = require("./wanted.anchor");
