import { FieldTemplate } from "../baseTemplates/FieldTemplate";

export class PhoneFieldTemplate extends FieldTemplate{
    // Define phone specific properties like validators
    override validators: any[] = [];
    constructor(){
        super();
        this.validators = [];
    }
    override validate(): boolean {
        return true;
    }
}