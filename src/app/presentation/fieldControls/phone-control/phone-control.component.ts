import { Component, computed, model } from '@angular/core';
import { FieldControl } from '../../interfaces/FieldControl';
import { PhoneFieldInstance } from '../../../domain/entities/models/FieldModels.ts/PhoneFieldInstance';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-phone-control',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './phone-control.component.html',
	styleUrl: './phone-control.component.scss'
})
export class PhoneControlComponent extends FieldControl {
	fieldData = model<PhoneFieldInstance>();
	// validators = input<any>();
	// Update view when values change
	hidden = computed(() => this.fieldData()?.hidden());
	disabled = computed(() => this.fieldData()?.disabled());
	constructor(mCaseService: mCaseUtilityService){
		super(mCaseService);
	}
	onValueChange(value: string) {
		// Update property. Make sure to property update signal
		this.fieldData()?.updateValue(value);
	}
}
