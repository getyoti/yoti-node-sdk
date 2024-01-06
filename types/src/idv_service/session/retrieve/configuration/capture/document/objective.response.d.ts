export = ObjectiveResponse;
declare class ObjectiveResponse {
    /**
     * @param {object} objective
     */
    constructor(objective: object);
    /** @private */
    private type;
    /**
     * Returns the objective type as a String
     *
     * @return {string | null}
     */
    getType(): string | null;
}
