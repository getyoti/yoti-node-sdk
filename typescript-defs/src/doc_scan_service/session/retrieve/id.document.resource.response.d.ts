export = IdDocumentResourceResponse;
declare class IdDocumentResourceResponse extends ResourceResponse {
    constructor(resource: any);
    documentType: any;
    issuingCountry: any;
    pages: any;
    documentFields: DocumentFieldsResponse;
    documentIdPhoto: DocumentIdPhotoResponse;
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
     * @returns {TextExtractionTaskResponse[]}
     */
    getTextExtractionTasks(): TextExtractionTaskResponse[];
}
import ResourceResponse = require("./resource.response");
import DocumentFieldsResponse = require("./document.fields.response");
import DocumentIdPhotoResponse = require("./document.id.photo.response");
import PageResponse = require("./page.response");
import TextExtractionTaskResponse = require("./text.extraction.task.response");
