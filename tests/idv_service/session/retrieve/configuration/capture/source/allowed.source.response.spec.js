const IDVConstants = require('../../../../../../../src/idv_service/idv.constants');
const EndUserAllowedSourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/source/end.user.allowed.source.response');
const IbvAllowedSourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/source/ibv.allowed.source.response');
const RelyingBusinessAllowedSourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/source/relying.business.allowed.source.response');
const UnknownAllowedSourceResponse = require('../../../../../../../src/idv_service/session/retrieve/configuration/capture/source/unknown.allowed.source.response');

describe('AllowedSourceResponse', () => {
  it('should get the right type', () => {
    const endUserSource = new EndUserAllowedSourceResponse();
    const relyingBusinessSource = new RelyingBusinessAllowedSourceResponse();
    const ibvSource = new IbvAllowedSourceResponse();
    const unknownSource = new UnknownAllowedSourceResponse();

    expect(endUserSource.getType()).toBe(IDVConstants.END_USER);
    expect(relyingBusinessSource.getType()).toBe(IDVConstants.RELYING_BUSINESS);
    expect(ibvSource.getType()).toBe(IDVConstants.IBV);
    expect(unknownSource.getType()).toBe(undefined);
  });
});
