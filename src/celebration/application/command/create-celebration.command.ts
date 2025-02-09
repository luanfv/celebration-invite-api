export class CreateCelebrationCommand {
  constructor(
    readonly title: string,
    readonly description: string,
    readonly date: Date,
    readonly addressZipCode: string,
    readonly addressStreet: string,
    readonly addressNumber: number,
  ) {}
}
