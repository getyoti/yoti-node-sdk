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
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        type: string;
        preferred_sources: {
            anchors: WantedAnchor[];
            soft_preference: boolean;
        };
    };
}
import WantedAnchor = require("./wanted.anchor");
