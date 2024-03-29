import { FieldTemplate } from "../baseTemplates/FieldTemplate";
import { DateFieldTemplate } from "./DateFieldTemplate";

export class MirrorDateFieldTemplate extends DateFieldTemplate {
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
    }
}