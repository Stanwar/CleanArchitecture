import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { StringFieldTemplate } from "../../fieldTemplates/StringFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { RecordInstance } from "../RecordInstance";

export class StringFieldInstance extends FieldInstance {
    override fieldTemplate: StringFieldTemplate;
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(mCaseService,value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as StringFieldTemplate;
    }
}