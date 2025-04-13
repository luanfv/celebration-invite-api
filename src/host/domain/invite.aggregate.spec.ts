import { InviteAggregate } from './invite.aggregate';
import { CelebrationAggregateBuilder } from './celebration.aggregate.builder';
import { AbandonedStatusState, ClosedStatusState } from './state';

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

    describe('WHEN celebration is abandoned', () => {
      it('SHOULD throw an exception', () => {
        const celebration = new CelebrationAggregateBuilder()
          .withStatus(new AbandonedStatusState())
          .build();
        expect(() => InviteAggregate.create(celebration)).toThrow(
          new Error('Cannot create invite to abandoned celebration'),
        );
      });
    });

    describe('WHEN celebration is canceled', () => {
      it('SHOULD throw an exception', () => {
        const celebration = new CelebrationAggregateBuilder()
          .withStatus(new ClosedStatusState())
          .build();
        expect(() => InviteAggregate.create(celebration)).toThrow(
          new Error('Cannot create invite to closed celebration'),
        );
      });
    });
  });
});
