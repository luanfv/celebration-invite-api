export class AddressVO {
  private readonly street: string;
  private readonly cep: string;
  private readonly number: number;
  private readonly regexCEP = /^\d{5}-?\d{3}$/;

  constructor(street: string, cep: string, number: number) {
    if (!this.isCep(cep)) throw new Error('Address - invalid CEP');
    if (1 > number) throw new Error('Address - invalid number');

    this.street = street;
    this.cep = cep;
    this.number = number;
  }

  private isCep(cep: string): boolean {
    return this.regexCEP.test(cep);
  }
}
