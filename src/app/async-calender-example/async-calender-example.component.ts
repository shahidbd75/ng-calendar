import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from '../model/color';

interface EventSchedule {
  name: string;
  eventDate: string;
}

function getTimezoneOffsetString(date: Date): string {
  const timezoneOffset = date.getTimezoneOffset();
  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'app-async-calender-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './async-calender-example.component.html',
  styles: []
})
export class AsyncCalenderExampleComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  events$: Observable<Array<CalendarEvent<{ schedule: EventSchedule }>>>;

  activeDayIsOpen = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchEvents();
  }
  fetchEvents(): void {
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

    this.events$ = this.http
      .post('https://localhost:44371/api/Vaccination/getVaccineSchedule', {
        fromDate: format(getStart(this.viewDate), 'yyyy-MM-dd'),
        toDate: format(getEnd(this.viewDate), 'yyyy-MM-dd')
      })
      .pipe(
        map((response: WebResponse) => {
          console.log(response);
          return response.data.map((schedule: EventSchedule) => {
            return {
              title: schedule.name,
              start: new Date(
                schedule.eventDate// + getTimezoneOffsetString(this.viewDate)
              ),
              color: colors.yellow,
              allDay: true,
              meta: {
                schedule
              }
            };
          });
        })
      );
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ schedule: EventSchedule }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ schedule: EventSchedule }>): void {
    window.open(
      `https://www.themoviedb.org/movie/${event.meta.schedule.name}`,
      '_blank'
    );
  }
}

interface WebResponse {
  message: string;
  isSuccess: boolean;
  code: number;
  data: any[];
}
