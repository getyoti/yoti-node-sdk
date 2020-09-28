const SupplementaryDocumentResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/supplementary.document.resource.response');
const PageResponse = require('../../../../src/doc_scan_service/session/retrieve/page.response');
const DocumentFieldsResponse = require('../../../../src/doc_scan_service/session/retrieve/document.fields.response');
const TaskResponse = require('../../../../src/doc_scan_service/session/retrieve/task.response');
const SupplementaryDocumentTextExtractionTaskResponse = require('../../../../src/doc_scan_service/session/retrieve/supplementary.document.text.extraction.task.response');
const FileResponse = require('../../../../src/doc_scan_service/session/retrieve/file.response');

describe('SupplementaryDocumentResourceResponse', () => {
  let documentResourceResponse;

  beforeEach(() => {
    documentResourceResponse = new SupplementaryDocumentResourceResponse({
      document_type: 'some-type',
      issuing_country: 'some-country',
      pages: [{
        someDetail: 'some-value',
      }],
      file: {},
      document_fields: {},
      tasks: [
        {
          type: 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION',
        },
        {
          type: 'SOME_UNKNOWN_TYPE',
        },
      ],
    });
  });

  describe('#getDocumentType', () => {
    it('should return document type', () => {
      expect(documentResourceResponse.getDocumentType()).toBe('some-type');
    });
  });

  describe('#getIssuingCountry', () => {
    it('should return issuing country', () => {
      expect(documentResourceResponse.getIssuingCountry()).toBe('some-country');
    });
  });

  describe('#getPages', () => {
    it('should return array of page info', () => {
      const pages = documentResourceResponse.getPages();
      expect(pages.length).toBe(1);
      expect(pages[0]).toBeInstanceOf(PageResponse);
    });
  });

  describe('#getDocumentFields', () => {
    it('should return document fields', () => {
      const fields = documentResourceResponse.getDocumentFields();
      expect(fields).toBeInstanceOf(DocumentFieldsResponse);
    });
  });

  describe('#getTasks', () => {
    it('should return a list of TaskResponse', () => {
      const tasks = documentResourceResponse.getTasks();
      tasks.forEach((task) => {
        expect(task).toBeInstanceOf(TaskResponse);
      });
    });
  });

  describe('#getTextExtractionTasks', () => {
    it('should return a list of SupplementaryDocumentTextExtractionTaskResponse', () => {
      const tasks = documentResourceResponse.getTextExtractionTasks();
      tasks.forEach((task) => {
        expect(task).toBeInstanceOf(SupplementaryDocumentTextExtractionTaskResponse);
      });
    });
  });

  describe('#getDocumentFile', () => {
    it('should return a FileResponse', () => {
      const file = documentResourceResponse.getDocumentFile();
      expect(file).toBeInstanceOf(FileResponse);
    });
  });
});
