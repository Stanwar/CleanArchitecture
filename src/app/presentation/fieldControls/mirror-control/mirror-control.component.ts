import { Component, model, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FieldInstance } from '../../../domain/entities/models/FieldInstance';

@Component({
	selector: 'app-mirror-control',
	standalone: true,
	imports: [FormsModule],
	templateUrl: './mirror-control.component.html',
	styleUrl: './mirror-control.component.scss'
})
export class MirrorControlComponent {
	fieldId: string ='';
	fieldData = model<FieldInstance>();
	value = signal<string>('');
	constructor(){
	}
	onValueChange(value: string) {
		const fieldData = this.fieldData();
		this.value.set(value);
	}
}
