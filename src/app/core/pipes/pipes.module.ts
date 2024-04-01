import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSSNPipe } from './custom-ssn.pipe';

@NgModule({
	declarations: [],
	imports: [
		CommonModule, 
		CustomSSNPipe
	]
})
export class PipesModule { }
