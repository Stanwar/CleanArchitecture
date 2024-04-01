import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { HeaderFieldTemplate } from "../../fieldTemplates/HeaderFieldTemplate";
import { FieldInstance } from "../FieldInstance";

export class HeaderFieldInstance extends FieldInstance{
    override fieldTemplate: HeaderFieldTemplate;
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as HeaderFieldTemplate;
    }
}