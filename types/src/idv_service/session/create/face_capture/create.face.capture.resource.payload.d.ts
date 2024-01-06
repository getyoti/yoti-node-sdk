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
    toJSON(): {
        requirement_id: string;
    };
}
