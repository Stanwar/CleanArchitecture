import { FieldTemplate } from "../baseTemplates/FieldTemplate";

export class DateFieldTemplate extends FieldTemplate{
    override fieldType = 'date';
    override defaultValue: string;
    constructor(fieldId: number, fieldSystemName: string, fieldLabel: string,defaultValue: string){
        super(fieldId, fieldSystemName, fieldLabel, defaultValue);
        this.defaultValue = defaultValue;
        this.validateDefaultValue();
    }

    validateDefaultValue() {
        if (this.defaultValue === null || this.defaultValue === undefined) {
            this.defaultValue = new Date().toISOString().split('T')[0];
        }
        
        else if (Number.parseInt(this.defaultValue, 10) > 0) {
            const newDate = new Date();
            newDate.setDate(newDate.getDate() + Number.parseInt(this.defaultValue));
            this.defaultValue = newDate.toISOString().split('T')[0];
        }
        else {
            this.defaultValue = this.defaultValue;
        }
    }
}