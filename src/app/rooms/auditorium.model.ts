export class Auditorium {
  constructor(
      public _id: string,
      public floor: string,
      public nomenclature: string,
      public details: {
          height: number,
          width: number
      },
      public capacity: number,
      public hourPrice: string,
      public description: string) { }
}
