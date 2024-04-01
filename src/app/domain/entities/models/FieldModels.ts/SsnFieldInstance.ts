import { signal } from "@angular/core";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { SsnFieldTemplate } from "../../fieldTemplates/SsnFieldTemplate";
import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";
import { StringFieldInstance } from "./StringFieldInstance";

export class SsnFieldInstance extends StringFieldInstance {
    override fieldTemplate: SsnFieldTemplate;
    constructor(mCaseService : mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
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

    override updateValue(value: string): void {
        // Validate whether the field value is template valid
        const validationResponses = this.fieldTemplate.validate(this);
        if (validationResponses.length > 0 && validationResponses.find((response) => !response.isValid()) === undefined){
            // Update itself
            this.value.set(value);
        }
        else {
            // Do we need to update the signal
            console.debug('SsnFieldInstance.updateValue: Validation failed');
        }
    }
}