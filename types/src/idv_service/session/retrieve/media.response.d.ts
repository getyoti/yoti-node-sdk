export = MediaResponse;
declare class MediaResponse {
    constructor(media: any);
    /** @private */
    private id;
    /** @private */
    private type;
    /** @private */
    private created;
    /** @private */
    private lastUpdated;
    /**
     * @returns {string}
     */
    getId(): string;
    /**
     * @returns {string}
     */
    getType(): string;
    /**
     * @returns {YotiDate}
     */
    getCreated(): YotiDate;
    /**
     * @returns {YotiDate}
     */
    getLastUpdated(): YotiDate;
}
import { YotiDate } from "../../../data_type/date";
