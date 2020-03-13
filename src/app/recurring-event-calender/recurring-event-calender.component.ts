import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CalendarView, CalendarEvent, CalendarEventAction } from 'angular-calendar';
import { colors } from '../model/color';
@Component({
  selector: 'app-recurring-event-calender',
  templateUrl: './recurring-event-calender.component.html',
  styleUrls: ['./recurring-event-calender.component.css']
})
export class RecurringEventCalenderComponent {

  activeDayIsOpen = true;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  actions: CalendarEventAction [] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    }
  ];

  events: CalendarEvent[] = [
    {
      start: new Date('03/16/2020'), //subDays(startOfDay(new Date()), 1),
      end: new Date('03/17/2020'),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
  constructor() { }
  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
  }
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
