import { signal } from "@angular/core";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { DropdownFieldTemplate } from "../../fieldTemplates/DropdownFieldTemplate";
import { FieldInstance } from "../FieldInstance";

export class DropdownFieldInstance extends FieldInstance {
    override fieldTemplate: DropdownFieldTemplate;
    constructor(value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as DropdownFieldTemplate;
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