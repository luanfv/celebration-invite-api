import { GuestEntity } from './guest.entity';
import { InviteAggregateBuilder } from '../invite/invite.aggregate.builder';
import { InviteStatusEnum } from '../invite/state';

describe('Guest entity unit tests', () => {
  describe('create', () => {
    it('SHOULD return a guest', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.DRAFT)
        .build();
      const result = GuestEntity.create('John', invite);
      expect(result.values).toEqual({
        id: expect.any(String),
        name: 'John',
        inviteId: invite.values.id,
      });
    });

    describe('WHEN invite is not DRAFT', () => {
      it('SHOULD throw an exception', () => {
        const invite = new InviteAggregateBuilder()
          .withStatusValue(InviteStatusEnum.REVOKED)
          .build();
        expect(() => GuestEntity.create('John', invite)).toThrow(
          new Error(
            'Cannot create guest to this invite because it status is REVOKED',
          ),
        );
      });
    });

    describe('WHEN invite already have a guest', () => {
      it('SHOULD throw an exception', () => {
        const invite = new InviteAggregateBuilder()
          .withStatusValue(InviteStatusEnum.DRAFT)
          .build();
        GuestEntity.create('John 1', invite);
        expect(() => GuestEntity.create('John 2', invite)).toThrow(
          new Error(
            'Cannot create guest to this invite because it already have a guest',
          ),
        );
      });
    });
  });
});
