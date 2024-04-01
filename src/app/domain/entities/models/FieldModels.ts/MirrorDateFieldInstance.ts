import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";
import { MirrorDateFieldTemplate } from "../../fieldTemplates/MirrorDateFieldTemplate";
import { DateFieldInstance } from "./DateFieldInstance";

export class MirrorDateFieldInstance extends DateFieldInstance {
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: MirrorDateFieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
    }
}