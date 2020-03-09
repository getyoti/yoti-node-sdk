
const IdDocumentResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/id.document.resource.response');
const PageResponse = require('../../../../src/doc_scan_service/session/retrieve/page.response');
const DocumentFieldsResponse = require('../../../../src/doc_scan_service/session/retrieve/document.fields.response');
const TextExtractionTaskResponse = require('../../../../src/doc_scan_service/session/retrieve/text.extraction.task.response');

describe('IdDocumentResourceResponse', () => {
  let documentResourceResponse;

  beforeEach(() => {
    documentResourceResponse = new IdDocumentResourceResponse({
      document_type: 'some-type',
      issuing_country: 'some-country',
      pages: [{
        someDetail: 'some-value',
      }],
      document_fields: {},
    });
  });

  describe('#getDocumentType', () => {
    it('should return document type', () => {
      expect(documentResourceResponse.getDocumentType()).toBe('some-type');
    });
  });

  describe('#getIssuingCountry', () => {
    it('should return result check', () => {
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

  describe('#getTextExtractionTasks', () => {
    it('should return a list of TextExtractionTaskResponse', () => {
      const tasks = documentResourceResponse.getTextExtractionTasks();
      tasks.forEach((task) => {
        expect(task).toBeInstanceOf(TextExtractionTaskResponse);
      });
    });
  });
});
