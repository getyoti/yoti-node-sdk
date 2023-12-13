export = RequiredResourceResponse;
declare class RequiredResourceResponse {
    /**
     * @param {object} requiredResource
     */
    constructor(requiredResource: object);
    type: any;
    id: any;
    state: any;
    allowedSources: any;
    /**
     * @return {string}
     */
    getType(): string;
    /**
     * @return {string}
     */
    getId(): string;
    /**
     * @return {string}
     */
    getState(): string;
    /**
     * @return {AllowedSourceResponse[]}
     */
    getAllowedSources(): AllowedSourceResponse[];
    /**
     *
     * Returns if the Relying Business is allowed to upload resources
     * to satisfy the requirement.
     *
     * return the end user is allowed to upload resources
     *
     * @return {boolean}
     */
    isRelyingBusinessAllowed(): boolean;
}
