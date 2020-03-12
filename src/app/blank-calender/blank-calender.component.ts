import { Component, OnInit } from '@angular/core';
import { CalendarView, CalendarEvent } from 'angular-calendar';
import { colors } from '../model/color';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';

@Component({
  selector: 'app-blank-calender',
  templateUrl: './blank-calender.component.html',
  styleUrls: ['./blank-calender.component.css']
})
export class BlankCalenderComponent implements OnInit {

  viewDate: Date = new Date();
  activeDayIsOpen = true;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  events: CalendarEvent[] = [
    {
      start: new Date('03/15/2020'), //subDays(startOfDay(new Date()), 1),
      end: new Date('03/17/2020'),
      title: 'A 3 day event',
      color: colors.red,
      //actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];

  constructor() { }

  ngOnInit() {
  }


  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
