import { signal } from "@angular/core";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { PhoneFieldTemplate } from "../../fieldTemplates/PhoneFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";

export class PhoneFieldInstance extends FieldInstance {
    override fieldTemplate: PhoneFieldTemplate;
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as PhoneFieldTemplate;
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