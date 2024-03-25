import { Component, computed, effect, input, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StringFieldInstance } from '../../../domain/entities/models/FieldModels.ts/StringFieldInstance';
import { FieldControl } from '../../interfaces/FieldControl';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-string-control',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './string-control.component.html',
  styleUrl: './string-control.component.scss'
})
export class StringControlComponent extends FieldControl{
	fieldData = model<StringFieldInstance>();
	// validators = input<any>();
	// Update view when values change
	hidden = computed(() => this.fieldData()?.isHidden());
	disabled = computed(() => this.fieldData()?.isDisabled());
	constructor(mCaseService: mCaseUtilityService){
		super(mCaseService);
	}
	onValueChange(value: string) {
		// Update property. Make sure to property update signal
		this.fieldData()?.updateValue(value);
	}
}
