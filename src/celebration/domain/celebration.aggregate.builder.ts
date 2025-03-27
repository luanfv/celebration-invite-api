import { faker } from '@faker-js/faker';
import { CelebrationAggregate } from './celebration.aggregate';
import { StatusState } from './state';

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

  withStatus(status: StatusState) {
    this._aggregate.status = status;
    return this;
  }

  build() {
    return this._aggregate;
  }
}
