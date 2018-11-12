import { Component, ChangeDetectionStrategy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isSameMonth, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, format } from 'date-fns';
import { CalendarEvent, CalendarEventAction, DAYS_OF_WEEK } from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ScheduleBooking } from './schedule-booking.model';

import { colors } from './schedule.colors';

const firstHour = 'T00:00:00.000Z';
const lastHour = 'T23:59:59.000Z';

@Component({
  selector: 'app-schedule',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.page.html',
})
export class SchedulePage implements OnInit {

  view = 'month';
  viewDate = new Date();
  locale = 'es';
  weekStartsOn: number = DAYS_OF_WEEK.MONDAY;
  weekendDays: number[] = [DAYS_OF_WEEK.SATURDAY, DAYS_OF_WEEK.SUNDAY];
  activeDayIsOpen = false;
  url = 'http://localhost:4100/reservasrutan/booking/filterdate';

  events$: Observable<Array<CalendarEvent<{ booking: ScheduleBooking }>>>;
  // @ViewChild('clicked') modalComponent: ScheduleModalComponent;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    }
  ];

  constructor(private _http: HttpClient, private modal: NgbModal) { }

  ngOnInit(): void {
    this.onScheduleBookings();
  }

  onScheduleBookings(): void {
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

    const criteria = {
      initdate: (format(getStart(this.viewDate), 'YYYY-MM-DD') + firstHour),
      finishdate: (format(getEnd(this.viewDate), 'YYYY-MM-DD') + lastHour)
    };

    this.events$ = this._http.post<any>(this.url, criteria)
      .pipe(
        map((results) => {
          return results.message.map((booking) => {
            return {
              title: booking.eventName,
              start: new Date(booking.initdate),
              end: new Date(booking.finishdate),
              color: this.colorHandled(booking.placeKind),
              actions: this.actions,
              meta: {
                nomenclature: booking.placeId.nomenclature,
                placeKind: booking.placeKind
              }
            };
          });
        })
      );
  }

  colorHandled(placeKind) {
    let typeColor;
    switch (placeKind) {
      case 'auditorium': {
        typeColor = colors.green;
        break;
      }
      case 'multipleroom': {
        typeColor = colors.brown;
        break;
      }
      default: {
        typeColor = colors.yellow;
      }
    }
    return typeColor;
  }

  dayClicked({
    date,
    events
  }: {
      date: Date;
      events: Array<CalendarEvent<{ booking: ScheduleBooking }>>;
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

  handleEvent(action: string, event: CalendarEvent): void { // It will let to edit the booking details into a modal.
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }
  // Sends the event to open the modal component and show the data from a specific booking.
  eventClicked(booking: CalendarEvent<{ booking: ScheduleBooking }>): void {
    // this.modalComponent.open(booking);
  }

}
