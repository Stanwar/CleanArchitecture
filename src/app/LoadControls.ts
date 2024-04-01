import { DatalistTemplate } from "./domain/entities/baseTemplates/DatalistTemplate";
import { FieldTemplate } from "./domain/entities/baseTemplates/FieldTemplate";
import { MirrorFieldTemplate } from "./domain/entities/fieldTemplates/MirrorFieldTemplate";
import { SsnFieldTemplate } from "./domain/entities/fieldTemplates/SsnFieldTemplate";
import { StringFieldTemplate } from "./domain/entities/fieldTemplates/StringFieldTemplate";
import { MirrorFieldInstance } from "./domain/entities/models/FieldModels.ts/MirrorFieldInstance";
import { StringFieldInstance } from "./domain/entities/models/FieldModels.ts/StringFieldInstance";
import { RecordInstance } from "./domain/entities/models/RecordInstance";
import { Inject, Injectable } from '@angular/core';
import {model} from '@angular/core';
import { mCaseUtilityService } from "./services/MCaseUtilityService";
import { FieldInstance } from "./domain/entities/models/FieldInstance";
import { SsnFieldInstance } from "./domain/entities/models/FieldModels.ts/SsnFieldInstance";
export class LoadControls {
    // This is a static method that will be used to load the controls
    loadControls(fieldData: any, mirrorFieldData: any){
        // Load the controls
        //#region Add Field Template
		const fieldID = 1;
		const fieldSystemName = 'firstName';
		const fieldLabel = 'First Name';
		const defaultValue = 'John';
		const stringFieldTemplate = new StringFieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);
		//#endregion
		//#region Add Datalist Template
		const datalistTemplate = new DatalistTemplate(99, 'Test Datalist', 'test-datalist');
		datalistTemplate.datalistID = 999;
		datalistTemplate.name = 'Test Datalist';
		datalistTemplate.systemName = 'test-datalist';
		datalistTemplate.headerRecordFormat = 'Test Header Record';
		datalistTemplate.hasChildren = false;
		datalistTemplate.fields = [stringFieldTemplate];
		//#endregion
		//Associate field to datalistTemplate
		stringFieldTemplate.setDatalist(datalistTemplate);

		//#region Add Record Instance
		var mCaseService = new mCaseUtilityService();
		const recordInstance = new RecordInstance(mCaseService, 999, []);
		//#endregion
		//#region Add String Field Instance
		const stringFieldInstance = new StringFieldInstance(this.mCaseService, '', 123, stringFieldTemplate);
		stringFieldInstance.setRecordInstance(recordInstance);
		//#endregion
		recordInstance.fields.push(stringFieldInstance);
		fieldData.set(stringFieldInstance);


		// Add Mirror Field
		const mirrorFieldID = 2;
		const mirrorFieldSystemName = 'copyFirstName';
		const mirrorFieldLabel = 'Mirror Control';
		const mirrorDefaultValue = '{[firstName]}';
		const mirrorFieldTemplate = new MirrorFieldTemplate(mirrorFieldID, mirrorFieldSystemName, mirrorFieldLabel, mirrorDefaultValue);
		// Associate field to datalistTemplate
		mirrorFieldTemplate.setDatalist(datalistTemplate);
		mirrorFieldTemplate.setupMirrorDependencies();
		datalistTemplate.fields.push(mirrorFieldTemplate);
		// Add Mirror Field Instance
		const mirrorFieldInstance = new MirrorFieldInstance(this.mCaseService, '', 456, mirrorFieldTemplate);
		mirrorFieldInstance.setRecordInstance(recordInstance);
		recordInstance.fields.push(mirrorFieldInstance);
		mirrorFieldData.set(mirrorFieldInstance);
    }

	createDataListTemplate(datalistID: number, name: string, systemName: string){
		const datalistTemplate = new DatalistTemplate(datalistID, name, systemName);
		return datalistTemplate;
	}

	createFieldTemplate(datalistTemplate: DatalistTemplate, type: FieldTemplateType, fieldID: number, fieldSystemName: string, fieldLabel: string, defaultValue: string){
		var fieldTemplate = this.fieldTemplateFactoryService.createFieldTemplate(type, datalistTemplate, fieldID, fieldSystemName, fieldLabel, defaultValue);
		return fieldTemplate;
	}
	createFieldInstance(type: FieldTemplateType, value: string, fieldInstanceID: number = 0, fieldTemplate: FieldTemplate): FieldInstance{
		var fieldInstance = this.fieldInstanceFactoryService.createFieldInstance(type, value, fieldInstanceID, fieldTemplate);

		return fieldInstance;
	}
	createRecordInstance(): RecordInstance{          
		var recordInstance = new RecordInstance(this.mCaseService, 0, []);
		return recordInstance;          
	}

	createDependency(){
	}
	
	constructor(private fieldTemplateFactoryService: FieldTemplateFactoryService, private fieldInstanceFactoryService: FieldInstanceFactoryService,private mCaseService: mCaseUtilityService){
		this.fieldTemplateFactoryService = fieldTemplateFactoryService;
		this.fieldInstanceFactoryService = fieldInstanceFactoryService;
		this.mCaseService = mCaseService;
	}
}

@Injectable({providedIn: 'root'})
export class FieldTemplateFactoryService {
	createFieldTemplate(type: FieldTemplateType, datalistTemplate: DatalistTemplate, fieldID: number, fieldSystemName: string, fieldLabel: string, defaultValue: string){
		let fieldTemplate;
		switch(type){
			case FieldTemplateType.String:
				fieldTemplate = new StringFieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);
				break;
			case FieldTemplateType.Mirror:
				fieldTemplate = new MirrorFieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);
				break;
			case FieldTemplateType.Ssn:
				fieldTemplate = new SsnFieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);
				break;
			default:
				fieldTemplate = new FieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);
		}

		fieldTemplate.setDatalist(datalistTemplate);
		datalistTemplate.fields.push(fieldTemplate);
		return fieldTemplate;
	}

}

@Injectable({providedIn: 'root'})
export class FieldInstanceFactoryService {
	createFieldInstance(type: FieldTemplateType, value: string, fieldInstanceID: number = 0, fieldTemplate: FieldTemplate){
		let fieldInstance;
		switch(type){
			case FieldTemplateType.String:
				fieldInstance = new StringFieldInstance(this.mCaseService, value, fieldInstanceID, fieldTemplate as StringFieldTemplate);
				break;
			case FieldTemplateType.Mirror:
				fieldInstance = new MirrorFieldInstance(this.mCaseService, value, fieldInstanceID, fieldTemplate as MirrorFieldTemplate);
				break;
			case FieldTemplateType.Ssn:
				fieldInstance = new SsnFieldInstance(this.mCaseService, value, fieldInstanceID, fieldTemplate as SsnFieldTemplate);
				break;
			default:
				fieldInstance = new FieldInstance(this.mCaseService, value, fieldInstanceID, fieldTemplate);
		}

		return fieldInstance;
	}
	constructor(private mCaseService: mCaseUtilityService){
		this.mCaseService = mCaseService;
	}
}

export enum FieldTemplateType {
	String,
	Mirror,
	Ssn
}