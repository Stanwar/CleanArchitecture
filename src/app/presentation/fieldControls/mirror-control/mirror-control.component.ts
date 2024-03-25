import { Component, computed, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MirrorFieldInstance } from '../../../domain/entities/models/FieldModels.ts/MirrorFieldInstance';

@Component({
	selector: 'app-mirror-control',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './mirror-control.component.html',
	styleUrl: './mirror-control.component.scss'
})
export class MirrorControlComponent {
	fieldId: string ='';
	fieldData = model<MirrorFieldInstance>();

	readonly = computed(() => {
		return this.fieldData()!.fieldTemplate.readonly;
	});
	constructor(){
	}
	onValueChange(value: string) {
		const fieldData = this.fieldData();
		fieldData!.updateValue(value);
		// Communicate with the presentation control
		// this.value.set(value);
	}
}
