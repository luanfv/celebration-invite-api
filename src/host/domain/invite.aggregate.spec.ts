import { InviteAggregate } from './invite.aggregate';
import { CelebrationAggregateBuilder } from './celebration.aggregate.builder';

describe('Invite entity unit tests', () => {
  describe('create', () => {
    it('SHOULD return an invite', () => {
      const celebration = new CelebrationAggregateBuilder().build();
      const result = InviteAggregate.create(celebration);
      expect(result.values).toEqual({
        id: expect.any(String),
        status: 'PENDENT',
        expireAt: celebration.values.date,
        guestId: undefined,
        celebrationId: celebration.values.id,
      });
    });
  });
});
