import { signal } from "@angular/core";
import { FieldTemplate } from "../../baseTemplates/FieldTemplate";
import { DateFieldTemplate } from "../../fieldTemplates/DateFieldTemplate";
import { FieldInstance } from "../FieldInstance";
import { mCaseUtilityService } from "../../../../services/MCaseUtilityService";

export class DateFieldInstance extends FieldInstance{
    override fieldTemplate: DateFieldTemplate;
    constructor(mCaseService: mCaseUtilityService, value: string, fieldInstanceID: number, fieldTemplate: FieldTemplate) {
        super(mCaseService, value, fieldInstanceID, fieldTemplate);
        this.fieldTemplate = fieldTemplate as DateFieldTemplate;
        // Kept value signal as string because the HTML input type date expect string value
        this.applyDefaultValueIfNeeded(value);
    }

    override applyDefaultValueIfNeeded(value: string): void {
        if (!value){
            this.value = signal(new Date(this.fieldTemplate.defaultValue).toISOString().split('T')[0]);
        }
        else {
            this.value.set(new Date(value).toISOString().split('T')[0]);
        }     
    }
}