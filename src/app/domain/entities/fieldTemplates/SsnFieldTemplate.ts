import { StringFieldTemplate } from "./StringFieldTemplate";

export class SsnFieldTemplate extends StringFieldTemplate {
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string, defaultValue: string) {
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
    }
}