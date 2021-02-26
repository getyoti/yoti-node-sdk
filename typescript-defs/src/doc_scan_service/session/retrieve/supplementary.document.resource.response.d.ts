export = SupplementaryDocumentResourceResponse;
declare class SupplementaryDocumentResourceResponse extends ResourceResponse {
    constructor(resource: any);
    documentType: any;
    issuingCountry: any;
    pages: any;
    documentFields: DocumentFieldsResponse;
    file: FileResponse;
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
import DocumentFieldsResponse = require("./document.fields.response");
import FileResponse = require("./file.response");
import SupplementaryDocumentTextExtractionTaskResponse = require("./supplementary.document.text.extraction.task.response");
import PageResponse = require("./page.response");
