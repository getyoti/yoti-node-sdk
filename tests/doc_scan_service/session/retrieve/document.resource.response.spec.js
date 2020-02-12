
const DocumentResourceResponse = require('../../../../src/doc_scan_service/session/retrieve/document.resource.response');
const PageInfo = require('../../../../src/doc_scan_service/session/retrieve/page.info');
const DocumentFieldsResponse = require('../../../../src/doc_scan_service/session/retrieve/document.fields.response');

describe('DocumentResourceResponse', () => {
  let documentResourceResponse;

  beforeEach(() => {
    documentResourceResponse = new DocumentResourceResponse({
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
      expect(pages[0]).toBeInstanceOf(PageInfo);
    });
  });

  describe('#getDocumentFields', () => {
    it('should return document fields', () => {
      const fields = documentResourceResponse.getDocumentFields();
      expect(fields).toBeInstanceOf(DocumentFieldsResponse);
    });
  });
});
