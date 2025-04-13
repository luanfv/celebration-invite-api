import { InviteAggregate } from '../invite/invite.aggregate';
import { GuestEntity } from './guest.entity';
import { CelebrationAggregateBuilder } from '../celebration/celebration.aggregate.builder';

describe('Guest entity unit tests', () => {
  describe('create', () => {
    it('SHOULD return a guest', () => {
      const celebration = new CelebrationAggregateBuilder().build();
      const invite = InviteAggregate.create(celebration);
      const result = GuestEntity.create('John', invite);
      expect(result.values).toEqual({
        id: expect.any(String),
        name: 'John',
        inviteId: invite.values.id,
      });
    });
  });
});
