export class ScheduleBooking {
  constructor (
      public id: string,
      public eventName: string,
      public initdate: Date,
      public finishdate: Date,
      public placeKind: string,
      public placeId: {
          nomenclature: string;
      }
  ) { }
}
