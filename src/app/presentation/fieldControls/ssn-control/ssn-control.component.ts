import { Component, computed, model } from '@angular/core';
import { StringControlComponent } from '../string-control/string-control.component';
import { SsnFieldInstance } from '../../../domain/entities/models/FieldModels.ts/SsnFieldInstance';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomSSNPipe } from '../../../core/pipes/custom-ssn.pipe';
import { FieldInstance } from '../../../domain/entities/models/FieldInstance';
import { FieldControl } from '../../interfaces/FieldControl';

@Component({
	selector: 'app-ssn-control',
	standalone: true,
	imports: [CommonModule, FormsModule, CustomSSNPipe],
	templateUrl: './ssn-control.component.html',
	styleUrl: './ssn-control.component.scss'
})
export class SsnControlComponent extends FieldControl {
	fieldData = model<SsnFieldInstance>();
	// validators = input<any>();
	// Update view when values change
	constructor(mCaseService: mCaseUtilityService){
		super(mCaseService);
	}

	override onValueChange(value: string) {
		value = value.replace(/-/g, '');
		this.fieldData()?.updateValue(value);
	}
}
