import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from '../model/color';

@Component({
  selector: 'app-async-event-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './async-event-calendar.component.html',
  styleUrls: ['./async-event-calendar.component.css']
})
export class AsyncEventCalendarComponent implements OnInit {

  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  activeDayIsOpen = false;
  events$: Observable<Array<CalendarEvent<{ schedule: EventSchedule }>>>;
  constructor(private http: HttpClient) { }
  events: CalendarEvent[];
  ngOnInit() {
    this.fetchEvents();
  }

  fetchEvents() {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    // console.log(format(getStart(this.viewDate), 'yyyy-MM-dd'));
    // console.log(format(getEnd(this.viewDate), 'yyyy-MM-dd'));

    this.events$ = this.http.post(`https://localhost:44371/api/Vaccination/getVaccineSchedule`, {
      fromDate: format(getStart(this.viewDate), 'yyyy-MM-dd'),
      toDate: format(getEnd(this.viewDate), 'yyyy-MM-dd')
    }).pipe(map((response: any) => response = response.data)).pipe(map((results: EventSchedule[]) => {
     return  results.map((schedule: EventSchedule)  => {
        console.log(schedule);
        return {
          title: schedule.name,
          start: new Date(
            schedule.eventDate  + this.getTimezoneOffsetString(this.viewDate)
          ),
          color: colors.red,
          allDay: true,
          meta: {
            schedule
          }
        };
      });
    }));
  }

  dayClicked(s) {
    console.log(s);
  }

  getTimezoneOffsetString(date: Date): string {
    const timezoneOffset = date.getTimezoneOffset();
    const hoursOffset = String(
      Math.floor(Math.abs(timezoneOffset / 60))
    ).padStart(2, '0');
    const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
    const direction = timezoneOffset > 0 ? '-' : '+';
    return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
  }
}



interface EventSchedule {
  //id: number;
  name: string;
  eventDate: string;
}
