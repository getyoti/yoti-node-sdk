export = SupplementaryDocumentResourceResponse;
declare class SupplementaryDocumentResourceResponse extends ResourceResponse {
    /** @private */
    private documentType;
    /** @private */
    private issuingCountry;
    /** @private */
    private pages;
    /** @private */
    private documentFields;
    /** @private */
    private file;
    /**
     * @returns {SupplementaryDocumentTextExtractionTaskResponse[]}
     */
    getTextExtractionTasks(): SupplementaryDocumentTextExtractionTaskResponse[];
    /**
     * @returns {string}
     */
    getDocumentType(): string;
    /**
     * @returns {string}
     */
    getIssuingCountry(): string;
    /**
     * @returns {PageResponse[]}
     */
    getPages(): PageResponse[];
    /**
     * @returns {DocumentFieldsResponse}
     */
    getDocumentFields(): DocumentFieldsResponse;
    /**
     * @returns {FileResponse}
     */
    getDocumentFile(): FileResponse;
}
import ResourceResponse = require("./resource.response");
import SupplementaryDocumentTextExtractionTaskResponse = require("./supplementary.document.text.extraction.task.response");
import PageResponse = require("./page.response");
import DocumentFieldsResponse = require("./document.fields.response");
import FileResponse = require("./file.response");
