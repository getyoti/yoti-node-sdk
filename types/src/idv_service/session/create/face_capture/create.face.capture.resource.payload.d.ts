export = CreateFaceCaptureResourcePayload;
/**
 *
 * @class CreateFaceCaptureResourcePayload
 */
declare class CreateFaceCaptureResourcePayload {
    /**
     * @param {string} requirementId
     */
    constructor(requirementId: string);
    /** @private */
    private requirementId;
    /**
     * Returns serialized data for JSON.stringify()
     */
    toJSON(): {
        requirement_id: string;
    };
}
