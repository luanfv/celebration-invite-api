import { faker } from '@faker-js/faker/.';
import { CelebrationAggregate } from './celebration.aggregate';
import { randomUUID } from 'node:crypto';

describe('Celebration aggregate unit tests', () => {
  it('SHOULD create a celebration', () => {
    const celebration = CelebrationAggregate.create({
      addressNumber: 99,
      addressStreet: faker.location.street(),
      addressZipCode: faker.location.zipCode('########'),
      date: new Date(),
      description: faker.lorem.paragraphs(),
      title: faker.lorem.words(3),
    });
    expect(celebration.values).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      date: expect.any(Date),
      createAt: expect.any(Date),
      status: expect.any(String),
      address: {
        zipCode: expect.any(String),
        street: expect.any(String),
        number: expect.any(Number),
      },
      invites: [],
    });
  });

  it('SHOULD restore a celebration', () => {
    const celebration = CelebrationAggregate.restore({
      id: randomUUID(),
      addressNumber: 99,
      addressStreet: faker.location.street(),
      addressZipCode: faker.location.zipCode('########'),
      date: new Date(),
      description: faker.lorem.paragraphs(),
      title: faker.lorem.words(3),
    });
    expect(celebration.values).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      description: expect.any(String),
      date: expect.any(Date),
      createAt: expect.any(Date),
      status: expect.any(String),
      address: {
        zipCode: expect.any(String),
        street: expect.any(String),
        number: expect.any(Number),
      },
      invites: [],
    });
  });
});
