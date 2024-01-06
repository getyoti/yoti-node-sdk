export = IdDocumentResourceResponse;
declare class IdDocumentResourceResponse extends ResourceResponse {
    /** @private */
    private documentType;
    /** @private */
    private issuingCountry;
    /** @private */
    private pages;
    /** @private */
    private documentFields;
    /** @private */
    private documentIdPhoto;
    /** @private */
    private expandedDocumentFields;
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
     * @returns {DocumentIdPhotoResponse}
     */
    getDocumentIdPhoto(): DocumentIdPhotoResponse;
    /**
     * @returns {ExpandedDocumentFieldsResponse}
     */
    getExpandedDocumentFields(): ExpandedDocumentFieldsResponse;
    /**
     * @returns {TextExtractionTaskResponse[]}
     */
    getTextExtractionTasks(): TextExtractionTaskResponse[];
}
import ResourceResponse = require("./resource.response");
import PageResponse = require("./page.response");
import DocumentFieldsResponse = require("./document.fields.response");
import DocumentIdPhotoResponse = require("./document.id.photo.response");
import ExpandedDocumentFieldsResponse = require("./expanded.document.fields.response");
import TextExtractionTaskResponse = require("./text.extraction.task.response");
