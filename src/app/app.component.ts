import { Component, model } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringControlComponent } from './presentation/fieldControls/string-control/string-control.component';
import { FormsModule } from '@angular/forms';
import { StringFieldInstance } from './domain/entities/models/FieldModels.ts/StringFieldInstance';
import { RecordInstance } from './domain/entities/models/RecordInstance';
import { FieldInstance } from './domain/entities/models/FieldInstance';
import { StringFieldTemplate } from './domain/entities/fieldTemplates/StringFieldTemplate';
import { DatalistTemplate } from './domain/entities/baseTemplates/DatalistTemplate';
import { MirrorControlComponent } from "./presentation/fieldControls/mirror-control/mirror-control.component";
import { MirrorFieldInstance } from './domain/entities/models/FieldModels.ts/MirrorFieldInstance';
import { MirrorFieldTemplate } from './domain/entities/fieldTemplates/MirrorFieldTemplate';
import { LoadControls } from './LoadControls';
import { FieldDependency } from './domain/entities/baseTemplates/FieldDependency';
import { FieldDependencyOption } from './domain/entities/baseTemplates/FieldDependencyOption';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FormsModule, StringControlComponent, MirrorControlComponent]
})
export class AppComponent {
	title = 'cleanArchitecture';
	fieldData= model<StringFieldInstance>();
	field1Data = model<StringFieldInstance>();
	mirrorFieldData= model<MirrorFieldInstance>();
	field2Data = model<StringFieldInstance>();
	// Establish data load
	// Transform into template configurations
	// Load record data into instances.
	// Display data in the view.
	constructor(){
		const loadControlClass = new LoadControls();
		loadControlClass.loadControls(this.fieldData, this.mirrorFieldData);

		// Problem statement : We need to add visibility dependency between two fields
		// Field 2 is dependent on Field 1 and will check its value to show/hide itself
		const fieldID = 1;
		const fieldSystemName = 'firstName';
		const fieldLabel = 'First Name';
		const defaultValue = 'John';
		const stringFieldTemplate = new StringFieldTemplate(fieldID, fieldSystemName, fieldLabel, defaultValue);

		const fieldID2 = 2;
		const fieldSystemName2 = 'lastName';
		const fieldLabel2 = 'Last Name';
		const defaultValue2 = 'Doe';
		const stringFieldTemplate2 = new StringFieldTemplate(fieldID2, fieldSystemName2, fieldLabel2, defaultValue2);
		
		//#endregion
		//#region Add Datalist Template
		const datalistTemplate = new DatalistTemplate();
		datalistTemplate.datalistID = 999;
		datalistTemplate.name = 'Test Datalist';
		datalistTemplate.systemName = 'test-datalist';
		datalistTemplate.headerRecordFormat = 'Test Header Record';
		datalistTemplate.hasChildren = false;
		datalistTemplate.fields = [stringFieldTemplate, stringFieldTemplate2];
		//#endregion
		//Associate field to datalistTemplate
		stringFieldTemplate.setDatalist(datalistTemplate);
		stringFieldTemplate2.setDatalist(datalistTemplate);
		//#region Create field dependency
		const fieldDependency = new FieldDependency();
		fieldDependency.allDependenciesMustPass = true;
		fieldDependency.displayOption = 'Hide';
		//#region Add Field Dependency Option
		const fieldDependencyOption = new FieldDependencyOption();
		fieldDependencyOption.dependentFieldID = 1;
		fieldDependencyOption.dependentOnFieldID = 2;
		fieldDependencyOption.fieldDependencyID = 1;
		fieldDependencyOption.type = 'Equals';
		fieldDependencyOption.value = 'Sharad';
		//#endregion
		fieldDependency.dependencies.push(fieldDependencyOption);

		stringFieldTemplate2.setVisibilityDependency(fieldDependency);
		//#region Add Record Instance
		const recordInstance = new RecordInstance(999, []);
		//#endregion
		//#region Add String Field Instance
		const stringFieldInstance = new StringFieldInstance('', 123, stringFieldTemplate);

		this.field1Data.set(stringFieldInstance);
		//#endregion
		recordInstance.fields.push(stringFieldInstance);
		//#region Add String Field Instance
		const stringFieldInstance2 = new StringFieldInstance('', 124, stringFieldTemplate2);
		this.field2Data.set(stringFieldInstance2);	
		recordInstance.fields.push(stringFieldInstance2);
		stringFieldInstance.setRecordInstance(recordInstance);
		stringFieldInstance2.setRecordInstance(recordInstance);
		//#endregion
	}
}
