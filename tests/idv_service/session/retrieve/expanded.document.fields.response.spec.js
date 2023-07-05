const ExpandedDocumentFieldsResponse = require('../../../../src/idv_service/session/retrieve/expanded.document.fields.response');
const MediaResponse = require('../../../../src/idv_service/session/retrieve/media.response');

describe('ExpandedDocumentFieldsResponse', () => {
  let expandedDocumentFields;

  describe('with media', () => {
    beforeEach(() => {
      expandedDocumentFields = new ExpandedDocumentFieldsResponse({
        media: {},
      });
    });

    describe('#getMedia', () => {
      it('should return media', () => {
        expect(expandedDocumentFields.getMedia()).toBeInstanceOf(MediaResponse);
      });
    });
  });

  describe('without media', () => {
    beforeEach(() => {
      expandedDocumentFields = new ExpandedDocumentFieldsResponse({});
    });

    describe('#getMedia', () => {
      it('should return undefined', () => {
        expect(expandedDocumentFields.getMedia()).toBeUndefined();
      });
    });
  });
});
