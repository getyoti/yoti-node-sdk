export = SourceConstraint;
declare class SourceConstraint {
    /**
     * @param {WantedAnchor[]} anchors
     * @param {boolean} softPreference
     */
    constructor(anchors: WantedAnchor[], softPreference?: boolean);
    anchors: WantedAnchor[];
    softPreference: boolean;
    /**
     * @returns {Object} data for JSON.stringify()
     */
    toJSON(): any;
}
import WantedAnchor = require("./wanted.anchor");
