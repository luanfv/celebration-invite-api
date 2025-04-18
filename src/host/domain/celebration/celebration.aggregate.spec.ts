import { faker } from '@faker-js/faker/.';
import { CelebrationAggregate } from './celebration.aggregate';
import { randomUUID } from 'node:crypto';
import {
  CelebrationStatusEnum,
  DraftStatusState,
  OpenedStatusState,
} from './state';
import { CelebrationAggregateBuilder } from './celebration.aggregate.builder';
import { ConfirmCelebrationEvent } from './event/confirm-celebration.event';

describe('Celebration aggregate unit tests', () => {
  describe('create', () => {
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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        status: CelebrationStatusEnum.DRAFT,
        address: {
          zipCode: expect.any(String),
          street: expect.any(String),
          number: expect.any(Number),
        },
      });
    });
  });

  describe('restore', () => {
    it.each(Object.values(CelebrationStatusEnum))(
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
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
          status: status,
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
        ).toThrow(new Error(`Celebration - status equal ${status} not exists`));
      });
    });
  });

  describe('changeToOpened', () => {
    it('SHOULD update the status to OPENED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(new DraftStatusState())
        .build();
      celebration.changeToOpened();
      expect(celebration.status).toEqual('OPENED');
    });
  });

  describe('changeToConfirmed', () => {
    it('SHOULD update the status to CONFIRMED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(new OpenedStatusState())
        .build();
      celebration.changeToConfirmed();
      expect(celebration.status).toEqual('CONFIRMED');
    });

    it('SHOULD apply the ConfirmCelebrationEvent', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(new OpenedStatusState())
        .build();
      const spyApply = jest.spyOn(celebration, 'apply');
      celebration.changeToConfirmed();
      expect(spyApply).toHaveBeenCalledWith(
        new ConfirmCelebrationEvent(celebration),
      );
    });
  });
});
