export = MediaResponse;
declare class MediaResponse {
    constructor(media: any);
    id: any;
    type: any;
    created: YotiDate;
    lastUpdated: YotiDate;
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
