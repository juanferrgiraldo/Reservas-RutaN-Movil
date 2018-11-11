export class MultipleRoom {
  constructor(
      public _id: string,
      public nomenclature: string,
      public details: {
          height: number,
          width: number
      },
      public capacity: number,
      public hourPrice: string,
      public description: string
  ) { }
}
