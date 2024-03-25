import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { StringControlComponent } from './presentation/fieldControls/string-control/string-control.component';
import { AppComponent } from './app.component';
@NgModule({
    declarations: [
    ],
    imports: [
        RouterOutlet, 
        FormsModule, 
        StringControlComponent,
        RouterModule.forRoot(routes),
    ],
    bootstrap: [],
    providers: []
})
export class AppModule {

}