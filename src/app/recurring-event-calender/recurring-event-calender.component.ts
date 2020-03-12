import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-recurring-event-calender',
  templateUrl: './recurring-event-calender.component.html',
  styleUrls: ['./recurring-event-calender.component.css']
})
export class RecurringEventCalenderComponent {

  viewDate: Date = new Date();
  constructor() { }

}
