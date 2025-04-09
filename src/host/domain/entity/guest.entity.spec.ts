import { InviteAggregate } from './../invite.aggregate';
import { Guest } from './guest.entity';
import { CelebrationAggregateBuilder } from '../celebration.aggregate.builder';

describe('Guest entity unit tests', () => {
  describe('create', () => {
    it('SHOULD return a guest', () => {
      const celebration = new CelebrationAggregateBuilder().build();
      const invite = InviteAggregate.create(celebration);
      const result = Guest.create('John', invite);
      expect(result.values).toEqual({
        id: expect.any(String),
        name: 'John',
        inviteId: invite.values.id,
      });
    });
  });
});
