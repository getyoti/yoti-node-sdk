export = ThirdPartyAttributeConverter;
declare class ThirdPartyAttributeConverter {
    static convertThirdPartyAttribute(protoBytes: any): AttributeIssuanceDetails;
}
import AttributeIssuanceDetails = require("../../data_type/attribute.issuance.details");
