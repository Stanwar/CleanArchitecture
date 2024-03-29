import { FieldTemplate } from "../baseTemplates/FieldTemplate";

export class DynamicDropdownFieldTemplate extends FieldTemplate {
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
    }
}