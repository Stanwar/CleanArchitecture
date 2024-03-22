import { Component, input, model, signal } from '@angular/core';
import { FieldInstance } from '../../../domain/entities/models/FieldInstance';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-string-control',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './string-control.component.html',
  styleUrl: './string-control.component.scss'
})
export class StringControlComponent{
	fieldId: string ='';
	fieldData = model<FieldInstance>();
	// validators = input<any>();
	value = signal<string>('');
	constructor(){
	}
	onValueChange(value: string) {
		// Update property. Make sure to property update signal
		this.fieldData()?.updateValue(value);
		this.value.set(value);
	}
}
