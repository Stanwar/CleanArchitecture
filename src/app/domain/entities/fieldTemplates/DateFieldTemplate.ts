import { FieldTemplate } from "../baseTemplates/FieldTemplate";

export class DateFieldTemplate extends FieldTemplate{
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string,defaultValue: string){
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
    }
}