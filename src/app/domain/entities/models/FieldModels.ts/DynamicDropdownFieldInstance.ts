import { signal } from "@angular/core";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { DynamicDropdownFieldTemplate } from "../../fieldTemplates/DynamicDropdownFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";

export class DynamicDropdownFieldInstance extends FieldInstance {
    override fieldTemplate: DynamicDropdownFieldTemplate;
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: DynamicDropdownFieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as DynamicDropdownFieldTemplate;
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