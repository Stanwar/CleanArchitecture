import { Component, computed, model } from '@angular/core';
import { FieldControl } from '../../interfaces/FieldControl';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { DateFieldInstance } from '../../../domain/entities/models/FieldModels.ts/DateFieldInstance';

@Component({
	selector: 'app-date-control',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './date-control.component.html',
	styleUrl: './date-control.component.scss'
})
export class DateControlComponent extends FieldControl {
	fieldData = model<DateFieldInstance>();
	// validators = input<any>();
	// Update view when values change
	hidden = computed(() => this.fieldData()?.hidden());
	disabled = computed(() => this.fieldData()?.disabled());
	constructor(mCaseService: mCaseUtilityService) {
		super(mCaseService);
	}
	onValueChange(value: string) {
		// Update property. Make sure to property update signal
		this.fieldData()?.updateValue(value);
	}
}
