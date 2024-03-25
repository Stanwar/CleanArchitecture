import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StringControlComponent } from './fieldControls/string-control/string-control.component';
import { MirrorControlComponent } from './fieldControls/mirror-control/mirror-control.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    StringControlComponent, 
    MirrorControlComponent
  ]
})
export class PresentationModule { }
