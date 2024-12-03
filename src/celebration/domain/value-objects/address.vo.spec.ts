import { faker } from '@faker-js/faker/.';
import { AddressVO } from './address.vo';

describe('Address value object unit tests', () => {
  it('SHOULD create an address', () => {
    const address = new AddressVO(
      faker.location.street(),
      faker.location.zipCode('########'),
      150,
    );
    expect(address).toEqual({
      street: expect.any(String),
      zipCode: expect.any(String),
      number: expect.any(Number),
    });
  });

  describe('WHEN zip code is invalid', () => {
    const zipCodeInvalid = faker.location.zipCode('#####');

    it(`SHOULD throw an error: Address - zip code = ${zipCodeInvalid} is invalid`, () => {
      expect(
        () => new AddressVO(faker.location.street(), zipCodeInvalid, 150),
      ).toThrow(new Error(`Address - zip code = ${zipCodeInvalid} is invalid`));
    });
  });

  describe('WHEN number is invalid', () => {
    const numberInvalid = 0;

    it(`SHOULD throw an error: Address - number = ${numberInvalid} is invalid`, () => {
      expect(
        () =>
          new AddressVO(
            faker.location.street(),
            faker.location.zipCode('########'),
            numberInvalid,
          ),
      ).toThrow(new Error(`Address - number = ${numberInvalid} is invalid`));
    });
  });
});
