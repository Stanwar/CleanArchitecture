import { Component, computed, model } from '@angular/core';
import { FieldControl } from '../../interfaces/FieldControl';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { MirrorDateFieldInstance } from '../../../domain/entities/models/FieldModels.ts/MirrorDateFieldInstance';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-mirror-date-control',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './mirror-date-control.component.html',
	styleUrl: './mirror-date-control.component.scss'
})
export class MirrorDateControlComponent extends FieldControl {
	fieldData = model<MirrorDateFieldInstance>();
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
