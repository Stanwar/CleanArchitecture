import { signal } from "@angular/core";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { PhoneFieldTemplate } from "../../fieldTemplates/PhoneFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { SsnFieldTemplate } from "../../fieldTemplates/SsnFieldTemplate";

export class SsnFieldInstance extends FieldInstance {
    override fieldTemplate: SsnFieldTemplate;
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as SsnFieldTemplate;
        this.applyDefaultValueIfNeeded(value);
    }

    override applyDefaultValueIfNeeded(value: string): void {
        if (!value) {
            this.value = signal(this.fieldTemplate.defaultValue);
        }
        else {
            this.value.set(value);
        }
    }
}