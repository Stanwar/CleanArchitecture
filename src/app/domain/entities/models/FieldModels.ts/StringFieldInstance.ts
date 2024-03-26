import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { StringFieldTemplate } from "../../fieldTemplates/StringFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { RecordInstance } from "../RecordInstance";

export class StringFieldInstance extends FieldInstance {
    override fieldTemplate: StringFieldTemplate;
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as StringFieldTemplate;
    }
    
    isDisabled(): boolean {
        // Update this via field instance value
        return true;
    }
}