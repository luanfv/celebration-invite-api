import { randomUUID } from 'crypto';
import { Guest } from './entity/guest.entity';
import { InviteAggregate } from './invite.aggregate';
import { faker } from '@faker-js/faker';

describe('Invite entity unit tests', () => {
  it.each`
    expireAt               | maxGuest | guests
    ${faker.date.future()} | ${2}     | ${[]}
    ${faker.date.future()} | ${1}     | ${[Guest.create(faker.person.fullName(), 18, true).values]}
    ${faker.date.future()} | ${2}     | ${[Guest.create(faker.person.fullName(), 30, true).values]}
  `('SHOULD create an invite', ({ expireAt, maxGuest, guests }) => {
    const invite = InviteAggregate.create({
      expireAt,
      maxGuest,
      guests,
      celebrationId: randomUUID(),
    });
    expect(invite.values).toEqual({
      id: expect.any(String),
      guests: expect.any(Array<Guest>),
      expireAt: expect.any(Date),
      maxGuest: expect.any(Number),
      status: expect.any(String),
    });
  });

  describe('WHEN max guest is less than 1', () => {
    it('SHOULD throw an error: Invite - max guest cannot be less than 1', () => {
      expect(() =>
        InviteAggregate.create({
          expireAt: faker.date.future(),
          maxGuest: 0,
          guests: [],
          celebrationId: randomUUID(),
        }),
      ).toThrow(new Error('Invite - max guest cannot be less than 1'));
    });
  });

  describe('WHEN than max guest is less than guest count', () => {
    it('SHOULD throw an error: Invite - guest list cannot be more than max guest', () => {
      const guests = [
        Guest.create(faker.person.fullName(), 30, true).values,
        Guest.create(faker.person.fullName(), 20, true).values,
      ];
      expect(() =>
        InviteAggregate.create({
          expireAt: faker.date.future(),
          maxGuest: 1,
          guests,
          celebrationId: randomUUID(),
        }),
      ).toThrow(new Error('Invite - guest list cannot be more than max guest'));
    });
  });
});
