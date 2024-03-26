import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringControlComponent } from './string-control.component';
import { StringFieldInstance } from '../../../domain/entities/models/FieldModels.ts/StringFieldInstance';
import { StringFieldTemplate } from '../../../domain/entities/fieldTemplates/StringFieldTemplate';

describe('StringControlComponent', () => {
	let component: StringControlComponent;
	let fixture: ComponentFixture<StringControlComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [StringControlComponent]
		})
		.compileComponents();

		fixture = TestBed.createComponent(StringControlComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// Test that the component was created successfully.
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('fieldData', () => {
		beforeEach(() => {
			const fieldID = 1;
			const fieldSystemName = 'firstName';
			const fieldLabel = 'First Name';
			const defaultValue = 'John';
			const stringFieldTemplate = new StringFieldTemplate(fieldID, fieldSystemName, '', defaultValue);
			var stringFieldInstance = new StringFieldInstance('test', 1, stringFieldTemplate);
			component.fieldData.set(stringFieldInstance);
		});

		it('fieldInstance exists', () =>{
			expect(component.fieldData()).toBeTruthy();
		});

		it('field label should exist', () => {
			var fieldLabel = fixture.nativeElement.querySelector('label');
			expect(fieldLabel).not.toEqual('');
		});
	});
	// Check recordInstance is not null
	// Check fieldTemplate is not null
	// Check datalistTemplate is not null
	// Check fieldInstance is not null
	// Test that the component has a fieldInstance associated with it.
	// it('component should have a fieldInstance associated with it', () => {
	// 	expect(component.fieldData()).toBeTruthy();
	// });

	// // Test the fieldInstance associated with the component is of type StringFieldInstance.
	// it('fieldInstance should be of type StringFieldInstance', () => {
	// 	var stringFieldInstance = component.fieldData();
	// 	expect(stringFieldInstance instanceof StringFieldInstance).toBeTruthy();
	// });
});
