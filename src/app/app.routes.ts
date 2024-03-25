import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'customControl',
        loadComponent: ()=>import('../app/presentation/fieldControls/string-control/string-control.component').then(m => m.StringControlComponent)
    }
];
