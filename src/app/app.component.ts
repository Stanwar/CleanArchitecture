import { Component, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringControlComponent } from './presentation/fieldControls/string-control/string-control.component';
import { FormsModule } from '@angular/forms';
import { StringFieldInstance } from './domain/entities/models/FieldModels.ts/StringFieldInstance';
import { MirrorControlComponent } from "./presentation/fieldControls/mirror-control/mirror-control.component";
import { MirrorFieldInstance } from './domain/entities/models/FieldModels.ts/MirrorFieldInstance';
import { FieldInstanceFactoryService, FieldTemplateFactoryService, FieldTemplateType, LoadControls } from './LoadControls';
import { DateControlComponent } from './presentation/fieldControls/date-control/date-control.component';
import { DateFieldInstance } from './domain/entities/models/FieldModels.ts/DateFieldInstance';
import { mCaseUtilityService } from './services/MCaseUtilityService';
import { SsnFieldInstance } from './domain/entities/models/FieldModels.ts/SsnFieldInstance';
import { SsnControlComponent } from './presentation/fieldControls/ssn-control/ssn-control.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FormsModule, StringControlComponent, MirrorControlComponent, DateControlComponent, SsnControlComponent]
})
export class AppComponent {
	title = 'cleanArchitecture';
	fieldData= model<StringFieldInstance>();
	field1Data = model<StringFieldInstance>();
	mirrorFieldData= model<MirrorFieldInstance>();
	field2Data = model<StringFieldInstance>();
	field3Data = model<DateFieldInstance>();
	field4Data = model<SsnFieldInstance>();
	// Establish data load
	// Transform into template configurations
	// Load record data into instances.
	// Display data in the view.
	constructor(){
		var mCaseService = new mCaseUtilityService();
		var fieldTemplateFactoryService = new FieldTemplateFactoryService();
		var fieldInstanceFactoryService = new FieldInstanceFactoryService(mCaseService);
		const loadControlClass = new LoadControls(fieldTemplateFactoryService, fieldInstanceFactoryService, mCaseService);
		// loadControlClass.loadControls(this.fieldData, this.mirrorFieldData);
		const datalistTemplate = loadControlClass.createDataListTemplate(999, 'Test Datalist', 'test-datalist');
		const ssnFieldTemplate = loadControlClass.createFieldTemplate(datalistTemplate, FieldTemplateType.Ssn, 1, 'ssn', 'SSN', '123456789');
		const recordInstance = loadControlClass.createRecordInstance();

		const ssnFieldInstance = loadControlClass.createFieldInstance(FieldTemplateType.Ssn,'', 0, ssnFieldTemplate!) as SsnFieldInstance;

		recordInstance.fields.push(ssnFieldInstance!);
		ssnFieldInstance!.setRecordInstance(recordInstance);
		this.field4Data.set(ssnFieldInstance);
		//#region Create hardcoded instances

		// Problem statement : We need to add visibility dependency between two fields
		// Field 2 is dependent on Field 1 and will check its value to show/hide itself
		// const fieldID = 1;
		// const fieldSystemName = 'firstName';
		// const fieldLabel = 'First Name';
		// const defaultValue = 'John';
		// const stringFieldTemplate = new StringFieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);

		// const fieldID2 = 2;
		// const fieldSystemName2 = 'lastName';
		// const fieldLabel2 = 'Last Name';
		// const defaultValue2 = 'Doe';
		// const stringFieldTemplate2 = new StringFieldTemplate(fieldID2, fieldSystemName2, fieldLabel2, defaultValue2);
		
		//#endregion
		//#region Add Datalist Template
		// const datalistTemplate = new DatalistTemplate();
		// datalistTemplate.datalistID = 999;
		// datalistTemplate.name = 'Test Datalist';
		// datalistTemplate.systemName = 'test-datalist';
		// datalistTemplate.headerRecordFormat = 'Test Header Record';
		// datalistTemplate.hasChildren = false;
		// datalistTemplate.fields = [stringFieldTemplate, stringFieldTemplate2];
		//#endregion
		//Associate field to datalistTemplate
		// stringFieldTemplate.setDatalist(datalistTemplate);
		// stringFieldTemplate2.setDatalist(datalistTemplate);
		// //#region Create field dependency
		// const fieldDependency = new FieldDependency();
		// fieldDependency.allDependenciesMustPass = true;
		// fieldDependency.displayOption = 'Show';
		// //#region Add Field Dependency Option
		// const fieldDependencyOption = new FieldDependencyOption();
		// fieldDependencyOption.dependentFieldID = 2;
		// fieldDependencyOption.dependentOnFieldID = 1;
		// fieldDependencyOption.fieldDependencyID = 1;
		// fieldDependencyOption.type = 'Exact';
		// fieldDependencyOption.value = 'Sharad';
		// //#endregion
		// fieldDependency.dependencies.push(fieldDependencyOption);

		// stringFieldTemplate2.setVisibilityDependency(fieldDependency);
		// //#region Add Record Instance
		// const recordInstance = new RecordInstance(999, []);
		// //#endregion
		// //#region Add String Field Instance
		// const stringFieldInstance = new StringFieldInstance('', 123, stringFieldTemplate);

		// this.field1Data.set(stringFieldInstance);
		// //#endregion
		// recordInstance.fields.push(stringFieldInstance);
		// //#region Add String Field Instance
		// const stringFieldInstance2 = new StringFieldInstance('', 124, stringFieldTemplate2);
		// this.field2Data.set(stringFieldInstance2);	
		// recordInstance.fields.push(stringFieldInstance2);
		// stringFieldInstance.setRecordInstance(recordInstance);
		// stringFieldInstance2.setRecordInstance(recordInstance);
		// //#endregion
		
		// //#region Add Date Field 
		// const fieldID3 = 1;
		// const fieldSystemName3 = 'sampleDate';
		// const fieldLabel3 = 'Sample Date';
		// const defaultValue3 = '5';
		// const dateFieldTemplate = new DateFieldTemplate(fieldID3, fieldSystemName3, fieldLabel3, defaultValue3);
		// dateFieldTemplate.setDatalist(datalistTemplate);
		// datalistTemplate.fields.push(dateFieldTemplate);
		// const dateFieldInstance = new DateFieldInstance('', 125, dateFieldTemplate);
		// recordInstance.fields.push(dateFieldInstance);
		// dateFieldInstance.setRecordInstance(recordInstance);
		// this.field3Data.set(dateFieldInstance);
		//#endregion
		//#endregion
	}
}
