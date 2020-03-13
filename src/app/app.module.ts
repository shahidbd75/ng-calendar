import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import {HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalenderBasicComponent } from './calender-basic/calender-basic.component';
import { BlankCalenderComponent } from './blank-calender/blank-calender.component';
import { RecurringEventCalenderComponent } from './recurring-event-calender/recurring-event-calender.component';
import { AsyncEventCalendarComponent } from './async-event-calendar/async-event-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    CalenderBasicComponent,
    BlankCalenderComponent,
    RecurringEventCalenderComponent,
    AsyncEventCalendarComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
