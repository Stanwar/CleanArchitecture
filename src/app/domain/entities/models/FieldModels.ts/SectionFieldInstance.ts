import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { SectionFieldTemplate } from "../../fieldTemplates/SectionFieldTemplate";
import { FieldInstance } from "../FieldInstance";

export class SectionFieldInstane extends FieldInstance{
    override fieldTemplate: SectionFieldTemplate;
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as SectionFieldTemplate;
    }
}