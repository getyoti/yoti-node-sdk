export = CreateFaceCaptureResourcePayloadBuilder;
/**
 *
 * @class CreateFaceCaptureResourcePayloadBuilder
 */
declare class CreateFaceCaptureResourcePayloadBuilder {
    /**
     * Sets the id of the requirement that the resource will be used to satisfy.
     *
     * @param {string} requirementId
     * @return CreateFaceCaptureResourcePayloadBuilder
     */
    withRequirementId(requirementId: string): this;
    requirementId: string;
    build(): CreateFaceCaptureResourcePayload;
}
import CreateFaceCaptureResourcePayload = require("./create.face.capture.resource.payload");
