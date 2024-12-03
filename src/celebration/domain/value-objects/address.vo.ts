export class AddressVO {
  readonly street: string;
  readonly zipCode: string;
  readonly number: number;

  constructor(street: string, zipCode: string, number: number) {
    if (!this.isZipCode(zipCode))
      throw new Error(`Address - zip code = ${zipCode} is invalid`);
    if (1 > number) throw new Error(`Address - number = ${number} is invalid`);

    this.street = street;
    this.zipCode = zipCode;
    this.number = number;
  }

  private isZipCode(zipCode: string): boolean {
    return /^\d{5}-?\d{3}$/.test(zipCode);
  }
}
