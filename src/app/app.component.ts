import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StringControlComponent } from './presentation/fieldControls/string-control/string-control.component';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, FormsModule, StringControlComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	title = 'cleanArchitecture';

	// Establish data load
	// Transform into template configurations
	// Load record data into instances.
	// Display data in the view.
}
