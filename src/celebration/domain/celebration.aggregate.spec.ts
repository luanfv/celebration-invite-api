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
      updatedAt: expect.any(Date),
      status: expect.any(String),
      address: {
        zipCode: expect.any(String),
        street: expect.any(String),
        number: expect.any(Number),
      },
    });
  });

  describe('restore', () => {
    const celebrationStatus = ['OPENED', 'CONFIRMED', 'CLOSED', 'ABANDONED'];

    it.each(celebrationStatus)(
      'SHOULD restore a celebration (status = %p)',
      (status) => {
        const celebration = CelebrationAggregate.restore({
          id: randomUUID(),
          addressNumber: 99,
          addressStreet: faker.location.street(),
          addressZipCode: faker.location.zipCode('########'),
          date: new Date(),
          description: faker.lorem.paragraphs(),
          title: faker.lorem.words(3),
          createdAt: new Date(),
          updatedAt: new Date(),
          status,
        });
        expect(celebration.values).toEqual({
          id: expect.any(String),
          title: expect.any(String),
          description: expect.any(String),
          date: expect.any(Date),
          createAt: expect.any(Date),
          updatedAt: expect.any(Date),
          status: expect.any(String),
          address: {
            zipCode: expect.any(String),
            street: expect.any(String),
            number: expect.any(Number),
          },
        });
      },
    );

    describe('WHEN restore with invalid status', () => {
      it('SHOULD throw an exception', () => {
        const status = 'INVALID-STATUS';
        expect(() =>
          CelebrationAggregate.restore({
            id: randomUUID(),
            addressNumber: 99,
            addressStreet: faker.location.street(),
            addressZipCode: faker.location.zipCode('########'),
            date: new Date(),
            description: faker.lorem.paragraphs(),
            title: faker.lorem.words(3),
            createdAt: new Date(),
            updatedAt: new Date(),
            status,
          }),
        ).toThrow(new Error(`Celebration - status = ${status} is invalid`));
      });
    });
  });
});
