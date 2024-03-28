import { computed, signal } from "@angular/core";
import { IValidator } from "../interfaces/IValidator";
import { FieldInstance } from "../models/FieldInstance";
import { DatalistTemplate } from "./DatalistTemplate";
import { DependencyDisplayOption, FieldDependency } from "./FieldDependency";
import { FieldOption } from "./FieldOption";
export class FieldTemplate{
    fieldID: number = 0;
    fieldSystemName: string = '';
    fieldLabel: string = '';
    datalist!: DatalistTemplate;
    parentFieldID= signal<number>(0);
    sortOrder: number = 0;
    defaultValue: string = '';
    required: boolean = false;
    readonly: boolean = false;
    // All field options will go here. 
    options: FieldOption[] = [];
    // These are just validations
    validators: IValidator[] = []; 
    private visibilityDependency: FieldDependency | undefined;
    private conditionalDependency: FieldDependency | undefined;
    dependentOnFields: FieldTemplate[] = [];
    conditionallyMandatoryOnFields: FieldTemplate[] = [];
    // Should this have a model transformation function?
    constructor(fieldID: number, 
                fieldSystemName: string, 
                fieldLabel: string,
                defaultValue: string
                ){
        this.fieldID = fieldID;
        this.fieldSystemName = fieldSystemName;
        this.fieldLabel = fieldLabel;
        this.defaultValue = defaultValue;
    }

    private setParentFieldID(){
        // TODO: Figure out this weird circular hell
        // This should auto set. Only available in ESNext lib for Typescript
        // this.parentFieldID.set(this.datalist.fields.findLast((field) => field.sortOrder < this.sortOrder && (field instanceof HeaderFieldTemplate || field instanceof SectionFieldTemplate))?.fieldID!);
        // Use this if we want older version of Typescript
        // const parentField = this.datalist.fields.reduceRight((previousField, currentField) => {
        //     if (currentField.sortOrder < this.sortOrder && (currentField instanceof HeaderFieldTemplate || currentField instanceof SectionFieldTemplate)){
        //         return currentField;
        //     }
        //     return previousField;
        // });
        // this.parentFieldID.set(parentField.fieldID);
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

    setVisibilityDependency(dependency: FieldDependency){
        this.visibilityDependency = dependency;
        if (this.datalist !== undefined && this.datalist !== null){
            this.datalist.fields.forEach((field) => {
                if (dependency.dependencies.some((dep) => dep.dependentFieldID == this.fieldID && dep.dependentOnFieldID == field.fieldID)){
                    this.dependentOnFields.push(field);
                }
            });
        }
    }

    getVisibilityDependency()
    {
        return this.visibilityDependency;
    }

    checkIfFieldIsDisabled(dependentFields: FieldInstance[]): boolean {
        const visibilityDependencyConfig = this.getVisibilityDependency();

        if (visibilityDependencyConfig === undefined){
            return false;
        }

        const displayOption = visibilityDependencyConfig.displayOption;
        // Default value?
        return displayOption === DependencyDisplayOption.Disable && this.runDependencyCheck(dependentFields);
    }

    checkIfFieldIsConditionallyMandatory(dependentFields: FieldInstance[]): boolean {
        return false;
    }

    checkIfFieldIsHidden(parentRecordInstance: FieldInstance | undefined, dependentFieldInstances: FieldInstance[]): boolean {
        // If parent is hidden, then hide field
        if (this.isParentFieldHidden(parentRecordInstance!)){
            return true;
        }

        const visibilityDependencyConfig = this.getVisibilityDependency();
        if (dependentFieldInstances.length === 0 || visibilityDependencyConfig === undefined){
            return false;
        }
        const displayOption = visibilityDependencyConfig.displayOption;

        const runDependenciesResult = this.runDependencyCheck(dependentFieldInstances);

        if (displayOption === DependencyDisplayOption.Hide){
            return runDependenciesResult;
        }
        else {
            return !runDependenciesResult;
        }
    }

    isParentFieldHidden(parentInstance: FieldInstance): boolean {
        if (parentInstance === undefined || parentInstance === null){
            return false;
        }

        return parentInstance.hidden();
    }

    private runDependencyCheck(dependentFieldInstances: FieldInstance[]): boolean {
        const visibilityDependencyConfig = this.getVisibilityDependency()!;
        // Check if all dependencies are met
        const allDependenciesMustPass = visibilityDependencyConfig.allDependenciesMustPass;

        const visibleDependencyConfigurations = visibilityDependencyConfig.dependencies;
        
        let matchedValues = Array<boolean>();
        // Check if all dependencies are met
        dependentFieldInstances.forEach((fieldInstance) => {
            const fieldInstanceValue = fieldInstance.value();
            // Get dependency option 
            const applicableDependency = visibleDependencyConfigurations.find((dependency) => dependency.dependentOnFieldID === fieldInstance.fieldTemplate.fieldID && dependency.dependentFieldID === this.fieldID);
            // Run validation
            const isDependencyValid = applicableDependency! && applicableDependency.isValid(fieldInstanceValue);
            matchedValues.push(isDependencyValid);
        });

        if (allDependenciesMustPass){
            return matchedValues.every((value) => value);
        }
        else {
            return matchedValues.some((value) => value);
        }
    }
}