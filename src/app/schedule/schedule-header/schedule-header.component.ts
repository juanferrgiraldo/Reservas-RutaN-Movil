import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-schedule-header',
  templateUrl: './schedule-header.component.html',
  styleUrls: ['./schedule-header.component.scss']
})
export class ScheduleHeaderComponent {

  @Input()
  view: string;

  @Input()
  viewDate: Date;

  @Input()
  locale: string;

  @Output()
  viewChange: EventEmitter<string> = new EventEmitter();

  @Output()
  viewDateChange: EventEmitter<Date> = new EventEmitter();
}
