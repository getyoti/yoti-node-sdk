export = ExtraDataConverter;
declare class ExtraDataConverter {
    static convertExtraData(extraDataBytes: any): ExtraData;
}
import ExtraData = require("../profile_service/extra.data");
