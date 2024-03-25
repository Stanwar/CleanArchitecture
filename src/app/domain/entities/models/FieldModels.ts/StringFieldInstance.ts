import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { StringFieldTemplate } from "../../fieldTemplates/StringFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { RecordInstance } from "../RecordInstance";

export class StringFieldInstance extends FieldInstance {
    override fieldTemplate: StringFieldTemplate;
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate, recordInstance: RecordInstance) {
        super(value, fieldInstanceID, fieldTemplate, recordInstance);
        this.fieldTemplate = fieldTemplate as StringFieldTemplate;
    }

    isHidden(): boolean {
        // Update this field instance value
        return true;
    }

    isDisabled(): boolean {
        // Update this via field instance value
        return true;
    }
}