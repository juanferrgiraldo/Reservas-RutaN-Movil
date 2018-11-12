export class Booking {
  constructor(
      public responsableId: string,
      public responsable: string,
      public organization: string,
      public responsableEmail: string,
      public responsablePhone: string,
      public eventName: string,
      public purpose: string,
      public assistants: number,
      public resources: string[],
      public aditional: string[],
      public placeKind: string,
      public placeId: string,
      public initdate: Date,
      public finishdate: Date,
      public distribution: string,
      public dates
  ) { }
}
