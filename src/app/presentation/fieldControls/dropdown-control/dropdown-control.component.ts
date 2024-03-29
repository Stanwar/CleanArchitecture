import { Component, computed, model } from '@angular/core';
import { FieldControl } from '../../interfaces/FieldControl';
import { DropdownFieldInstance } from '../../../domain/entities/models/FieldModels.ts/DropdownFieldInstance';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-dropdown-control',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './dropdown-control.component.html',
	styleUrl: './dropdown-control.component.scss'
})
export class DropdownControlComponent extends FieldControl {
	fieldData = model<DropdownFieldInstance>();
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
