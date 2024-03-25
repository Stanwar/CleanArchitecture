import { IValidator } from "../interfaces/IValidator";
import { FieldInstance } from "../models/FieldInstance";
import { DatalistTemplate } from "./DatalistTemplate";
import { FieldDependency } from "./FieldDependency";
import { FieldOption } from "./FieldOption";

export class FieldTemplate{
    fieldId: number = 0;
    fieldSystemName: string = '';
    fieldLabel: string = '';
    datalist!: DatalistTemplate;
    defaultValue: string = '';
    required: boolean = false;
    readonly: boolean = false;
    // All field options will go here. 
    options: FieldOption[] = [];
    // These are just validations
    validators: IValidator[] = []; 
    visibilityDependency: FieldDependency;
    // Should this have a model transformation function?
    constructor(fieldId: number, 
                fieldSystemName: string, 
                fieldLabel: string,
                defaultValue: string, 
                ){
        this.fieldId = fieldId;
        this.fieldSystemName = fieldSystemName;
        this.fieldLabel = fieldLabel;
        this.defaultValue = defaultValue;
        this.visibilityDependency = new FieldDependency();
    }

    setDatalist(datalist: DatalistTemplate){
        this.datalist = datalist;
    }

    validate(fieldInstance: FieldInstance): boolean {
        if (!(fieldInstance.fieldTemplate instanceof FieldTemplate)){
            console.debug('FieldTemplate.validate: fieldInstance.fieldTemplate is not a FieldTemplate');
            return false;
        }
        return true;
    }

    getMirrorDependencies(){
        // To be implemented
        const mirrorMap = this.datalist.mirrorDependencyMap.get(this.fieldSystemName);
        return mirrorMap;
    }

    getDependencies(){
        // To be implemented
        const dependencyMap = this.datalist.dependencyMap.get(this.fieldId);
        return dependencyMap;
    }
}