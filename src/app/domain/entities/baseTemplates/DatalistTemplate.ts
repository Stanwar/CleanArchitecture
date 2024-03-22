import { FieldTemplate } from "./FieldTemplate";
import { ITemplateOption } from "../interfaces/ITemplateOption";
import { MirrorFieldTemplate } from "../fieldTemplates/MirrorFieldTemplate";

export class DatalistTemplate {
    datalistID: number = 0;
    name: string = '';
    systemName: string = '';
    headerRecordFormat: string = '';
    hasChildren: boolean = false;
    children: DatalistTemplate[] = [];
    fields: FieldTemplate [] = [];
    // TODO: Should this be a global store also?
    options!: Map<string, ITemplateOption>;
    // DependentOnField -> List of DependentFields
    dependencyMap!: Map<number, Set<number>>;
    // DependentOnField -> List of Fields that are dependent on this field
    mirrorDependencyMap!: Map<string, Set<FieldTemplate>>; // Write custom comparator for FieldTemplate
    // Creating a new dependency map
    setupDependencies(){
        this.dependencyMap = new Map<number, Set<number>>();
        this.fields.forEach((field) => {
            field.visibilityDependency?.dependencies.forEach((fieldDependencyOption) => {

                if (this.dependencyMap.has(fieldDependencyOption.dependentOnFieldID)){
                    this.dependencyMap.get(fieldDependencyOption.dependentOnFieldID)?.add(fieldDependencyOption.dependentFieldID);
                } else {
                    this.dependencyMap.set(fieldDependencyOption.dependentOnFieldID, new Set([fieldDependencyOption.dependentFieldID]));  
                }
            });
        });
    }

    // This method sets up mirror dependencies for the DatalistTemplate.
    // It iterates over each field in the template and checks if it is an instance of MirrorFieldTemplate.
    // If it is, it adds the field to the mirrorDependencyMap using the field's system name as the key.
    // The mirrorDependencyMap is a map that stores a set of fields that are dependent on a specific mirror field.
    // This method is responsible for populating the mirrorDependencyMap with the appropriate dependencies.
    setupMirrorDependencies(){
        this.mirrorDependencyMap = new Map<string, Set<FieldTemplate>>();
        this.fields.forEach((field) => {
            if (field instanceof MirrorFieldTemplate){
                field.mirrorDependencies?.forEach((mirrorField) => {
                    if (this.mirrorDependencyMap.has(mirrorField.fieldSystemName)){
                        this.mirrorDependencyMap.get(mirrorField.fieldSystemName)?.add(field);
                    } else {
                        this.mirrorDependencyMap.set(mirrorField.fieldSystemName, new Set([field]));
                    }
                });
            }
        });
    }
}