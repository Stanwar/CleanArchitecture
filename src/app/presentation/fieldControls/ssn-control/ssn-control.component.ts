import { Component, computed, model } from '@angular/core';
import { StringControlComponent } from '../string-control/string-control.component';
import { SsnFieldInstance } from '../../../domain/entities/models/FieldModels.ts/SsnFieldInstance';
import { mCaseUtilityService } from '../../../services/MCaseUtilityService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-ssn-cntrol',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './ssn-control.component.html',
	styleUrl: './ssn-control.component.scss'
})
export class SsnControlComponent extends StringControlComponent {
	override fieldData = model<SsnFieldInstance>();
	// validators = input<any>();
	// Update view when values change
	constructor(mCaseService: mCaseUtilityService){
		super(mCaseService);
	}
}
