import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'customSSN',
	standalone: true
})
export class CustomSSNPipe implements PipeTransform {

	transform(value: number, length: number = 5): string {
		if (value) {
			const ssn = value.toString();
			return ssn.substring(0, 3) + '-' + ssn.substring(3, 5) + '-' + ssn.substring(5, 9);
		}
		return '';
	}
}