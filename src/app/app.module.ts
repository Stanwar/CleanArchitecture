import { NgModule } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { StringControlComponent } from './presentation/fieldControls/string-control/string-control.component';
import { PipesModule } from './core/pipes/pipes.module';

@NgModule({
    declarations: [
    ],
    imports: [
        RouterOutlet, 
        FormsModule, 
        StringControlComponent,
        RouterModule.forRoot(routes),
        PipesModule
    ],
    bootstrap: [],
    providers: []
})
export class AppModule {

}