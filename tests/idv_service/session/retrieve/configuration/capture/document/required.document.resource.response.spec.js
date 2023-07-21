const RequiredDocumentResourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/document/required.document.resource.response');
const RequestedIdDocTaskResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/task/requested.id.doc.task.response');
const RequestedSupplementaryDocTaskResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/task/requested.supplementary.doc.task.response');
const UnknownRequestedTaskResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/task/unknown.requested.task.response');

describe('RequiredDocumentResourceResponse', () => {
  let requiredDocumentResourceResponse;

  beforeEach(() => {
    requiredDocumentResourceResponse = new RequiredDocumentResourceResponse({
      type: 'ID_DOCUMENT',
      id: '123',
      state: 'REQUIRED',
      allowed_sources: [
        {
          type: 'END_USER',
        },
        {
          type: 'RELYING_BUSINESS',
        },
        {
          type: 'IBV',
        },
        {
          type: 'Unknown_Type',
        },
      ],
      requested_tasks: [
        {
          type: 'ID_DOCUMENT_TEXT_DATA_EXTRACTION',
          state: 'REQUIRED',
        },
        {
          type: 'SUPPLEMENTARY_DOCUMENT_TEXT_DATA_EXTRACTION',
          state: 'REQUIRED',
        },
        {
          type: 'Unknown_type',
          state: 'REQUIRED',
        },
      ],
    });
  });

  describe('#getRequestedTasks', () => {
    it('should return requested tasks', () => {
      expect(requiredDocumentResourceResponse.getRequestedTasks()).toHaveLength(3);

      expect(
        requiredDocumentResourceResponse.getRequestedTasks()[0]
      ).toBeInstanceOf(RequestedIdDocTaskResponse);
      expect(
        requiredDocumentResourceResponse.getRequestedTasks()[1]
      ).toBeInstanceOf(RequestedSupplementaryDocTaskResponse);
      expect(
        requiredDocumentResourceResponse.getRequestedTasks()[2]
      ).toBeInstanceOf(UnknownRequestedTaskResponse);
    });
  });
});
