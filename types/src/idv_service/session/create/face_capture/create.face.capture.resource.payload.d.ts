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
    requirementId: string;
    toJSON(): {
        requirement_id: string;
    };
}
