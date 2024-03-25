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

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FormsModule, StringControlComponent, MirrorControlComponent]
})
export class AppComponent {
	title = 'cleanArchitecture';
	fieldData = model<StringFieldInstance>();
	mirrorFieldData= model<MirrorFieldInstance>();
	// Establish data load
	// Transform into template configurations
	// Load record data into instances.
	// Display data in the view.
	constructor(){
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
		const stringFieldInstance = new StringFieldInstance('', 123, stringFieldTemplate, recordInstance);
		//#endregion
		recordInstance.fields.push(stringFieldInstance);
		this.fieldData.set(stringFieldInstance);


		// Add Mirror Field
		const mirrorFieldID = 2;
		const mirrorFieldSystemName = 'copyFirstName';
		const mirrorFieldLabel = 'Copy First Name';
		const mirrorDefaultValue = '{[firstName]}';
		const mirrorFieldTemplate = new MirrorFieldTemplate(mirrorFieldID, mirrorFieldSystemName, mirrorFieldLabel, mirrorDefaultValue);
		// Associate field to datalistTemplate
		mirrorFieldTemplate.setDatalist(datalistTemplate);
		mirrorFieldTemplate.setupMirrorDependencies();
		datalistTemplate.fields.push(mirrorFieldTemplate);
		// Add Mirror Field Instance
		const mirrorFieldInstance = new MirrorFieldInstance('', 456, mirrorFieldTemplate, recordInstance);
		recordInstance.fields.push(mirrorFieldInstance);
		this.mirrorFieldData.set(mirrorFieldInstance);
	}
}
