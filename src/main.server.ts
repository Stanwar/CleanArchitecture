import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { StringControlComponent } from './app/presentation/fieldControls/string-control/string-control.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(StringControlComponent, config);

export default bootstrap;
