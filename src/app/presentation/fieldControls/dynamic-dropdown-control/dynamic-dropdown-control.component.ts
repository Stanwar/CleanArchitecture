import { Component, computed, model } from '@angular/core';
import { FieldControl } from '../../interfaces/FieldControl';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { DynamicDropdownFieldInstance } from '../../../domain/entities/models/FieldModels.ts/DynamicDropdownFieldInstance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-dynamic-dropdown-control',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './dynamic-dropdown-control.component.html',
	styleUrl: './dynamic-dropdown-control.component.scss'
})
export class DynamicDropdownControlComponent extends FieldControl {
	fieldData = model<DynamicDropdownFieldInstance>();
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
