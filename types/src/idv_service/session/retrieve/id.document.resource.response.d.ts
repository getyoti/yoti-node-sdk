export = IdDocumentResourceResponse;
declare class IdDocumentResourceResponse extends ResourceResponse {
    documentType: any;
    issuingCountry: any;
    pages: any;
    documentFields: DocumentFieldsResponse;
    documentIdPhoto: DocumentIdPhotoResponse;
    expandedDocumentFields: ExpandedDocumentFieldsResponse;
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
import DocumentFieldsResponse = require("./document.fields.response");
import DocumentIdPhotoResponse = require("./document.id.photo.response");
import ExpandedDocumentFieldsResponse = require("./expanded.document.fields.response");
import PageResponse = require("./page.response");
import TextExtractionTaskResponse = require("./text.extraction.task.response");
