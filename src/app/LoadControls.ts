import { DatalistTemplate } from "./domain/entities/baseTemplates/DatalistTemplate";
import { MirrorFieldTemplate } from "./domain/entities/fieldTemplates/MirrorFieldTemplate";
import { StringFieldTemplate } from "./domain/entities/fieldTemplates/StringFieldTemplate";
import { MirrorFieldInstance } from "./domain/entities/models/FieldModels.ts/MirrorFieldInstance";
import { StringFieldInstance } from "./domain/entities/models/FieldModels.ts/StringFieldInstance";
import { RecordInstance } from "./domain/entities/models/RecordInstance";
import {model} from '@angular/core';
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
		const datalistTemplate = new DatalistTemplate();
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
		const recordInstance = new RecordInstance(999, []);
		//#endregion
		//#region Add String Field Instance
		const stringFieldInstance = new StringFieldInstance('', 123, stringFieldTemplate);
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
		const mirrorFieldInstance = new MirrorFieldInstance('', 456, mirrorFieldTemplate);
		mirrorFieldInstance.setRecordInstance(recordInstance);
		recordInstance.fields.push(mirrorFieldInstance);
		mirrorFieldData.set(mirrorFieldInstance);
    }
}