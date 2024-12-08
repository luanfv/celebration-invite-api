import { faker } from '@faker-js/faker/.';
import { CelebrationAggregate } from './celebration.aggregate';

export class CelebrationAggregateBuilder {
  private _aggregate: CelebrationAggregate;

  constructor() {
    this._aggregate = CelebrationAggregate.create({
      addressNumber: 99,
      addressStreet: faker.location.street(),
      addressZipCode: faker.location.zipCode('########'),
      date: new Date(),
      description: faker.lorem.paragraphs(),
      title: faker.lorem.words(3),
    });
  }

  build() {
    return this._aggregate;
  }
}
