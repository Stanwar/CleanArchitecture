import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { RecordInstance } from "../RecordInstance";

export class StringFieldInstance extends FieldInstance {
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate, recordInstance: RecordInstance) {
        super(value, fieldInstanceID, fieldTemplate, recordInstance);
    }
}