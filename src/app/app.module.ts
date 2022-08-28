import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  ConveyorComponent,
  ExtruderComponent,
  MotorComponent,
  OvenComponent,
  StamperComponent,
  SwitchComponent,
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    MotorComponent,
    ExtruderComponent,
    StamperComponent,
    OvenComponent,
    SwitchComponent,
    ConveyorComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
