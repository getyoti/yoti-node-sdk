const IdDocumentResourceResponse = require('../../../../src/idv_service/session/retrieve/id.document.resource.response');
const PageResponse = require('../../../../src/idv_service/session/retrieve/page.response');
const DocumentFieldsResponse = require('../../../../src/idv_service/session/retrieve/document.fields.response');
const TaskResponse = require('../../../../src/idv_service/session/retrieve/task.response');
const TextExtractionTaskResponse = require('../../../../src/idv_service/session/retrieve/text.extraction.task.response');
const DocumentIdPhotoResponse = require('../../../../src/idv_service/session/retrieve/document.id.photo.response');
const ExpandedDocumentFieldsResponse = require('../../../../src/idv_service/session/retrieve/expanded.document.fields.response');

describe('IdDocumentResourceResponse', () => {
  let documentResourceResponse;

  beforeEach(() => {
    documentResourceResponse = new IdDocumentResourceResponse({
      document_type: 'some-type',
      issuing_country: 'some-country',
      pages: [{
        someDetail: 'some-value',
      }],
      document_id_photo: {},
      expanded_document_fields: {},
      document_fields: {},
      tasks: [
        {
          type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
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

  describe('#getExpandedDocumentFields', () => {
    it('should return document ID photo', () => {
      const expandedDocumentFields = documentResourceResponse.getExpandedDocumentFields();
      expect(expandedDocumentFields).toBeInstanceOf(ExpandedDocumentFieldsResponse);
    });
  });

  describe('#getDocumentIdPhoto', () => {
    it('should return document ID photo', () => {
      const idPhoto = documentResourceResponse.getDocumentIdPhoto();
      expect(idPhoto).toBeInstanceOf(DocumentIdPhotoResponse);
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
    it('should return a list of TextExtractionTaskResponse', () => {
      const tasks = documentResourceResponse.getTextExtractionTasks();
      tasks.forEach((task) => {
        expect(task).toBeInstanceOf(TextExtractionTaskResponse);
      });
    });
  });
});
