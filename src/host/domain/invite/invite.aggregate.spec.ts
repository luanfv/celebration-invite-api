import { InviteAggregateBuilder } from './invite.aggregate.builder';
import { InviteAggregate } from './invite.aggregate';
import { CelebrationAggregateBuilder } from '../celebration/celebration.aggregate.builder';
import { AbandonedStatusState, ClosedStatusState } from '../celebration/state';
import { InviteStatusEnum } from './state';

describe('Invite aggregate unit tests', () => {
  describe('create', () => {
    it('SHOULD return an invite', () => {
      const celebration = new CelebrationAggregateBuilder().build();
      const result = InviteAggregate.create(celebration);
      expect(result.values).toEqual({
        id: expect.any(String),
        status: 'DRAFT',
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

  describe('isDraft', () => {
    it('SHOULD return true', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.DRAFT)
        .build();
      expect(invite.isDraft()).toEqual(true);
    });

    describe('WHEN status is not equal DRAFT', () => {
      const statusNotEqualDraftList = Object.values(InviteStatusEnum).filter(
        (value) => value !== InviteStatusEnum.DRAFT,
      );

      it.each(statusNotEqualDraftList)(
        'SHOULD return false (status = %p)',
        (status) => {
          const invite = new InviteAggregateBuilder()
            .withStatusValue(status)
            .build();
          expect(invite.isDraft()).toEqual(false);
        },
      );
    });
  });

  describe('isPendent', () => {
    it('SHOULD return true', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.PENDENT)
        .build();
      expect(invite.isPendent()).toEqual(true);
    });

    describe('WHEN status is not equal PENDENT', () => {
      const statusNotEqualPendentList = Object.values(InviteStatusEnum).filter(
        (value) => value !== InviteStatusEnum.PENDENT,
      );

      it.each(statusNotEqualPendentList)(
        'SHOULD return false (status = %p)',
        (status) => {
          const invite = new InviteAggregateBuilder()
            .withStatusValue(status)
            .build();
          expect(invite.isPendent()).toEqual(false);
        },
      );
    });
  });

  describe('isAccepted', () => {
    it('SHOULD return true', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.ACCEPTED)
        .build();
      expect(invite.isAccepted()).toEqual(true);
    });

    describe('WHEN status is not equal ACCEPTED', () => {
      const statusNotEqualAcceptedList = Object.values(InviteStatusEnum).filter(
        (value) => value !== InviteStatusEnum.ACCEPTED,
      );

      it.each(statusNotEqualAcceptedList)(
        'SHOULD return false (status = %p)',
        (status) => {
          const invite = new InviteAggregateBuilder()
            .withStatusValue(status)
            .build();
          expect(invite.isAccepted()).toEqual(false);
        },
      );
    });
  });

  describe('isRejected', () => {
    it('SHOULD return true', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.REJECTED)
        .build();
      expect(invite.isRejected()).toEqual(true);
    });

    describe('WHEN status is not equal REJECTED', () => {
      const statusNotEqualRejectedList = Object.values(InviteStatusEnum).filter(
        (value) => value !== InviteStatusEnum.REJECTED,
      );

      it.each(statusNotEqualRejectedList)(
        'SHOULD return false (status = %p)',
        (status) => {
          const invite = new InviteAggregateBuilder()
            .withStatusValue(status)
            .build();
          expect(invite.isRejected()).toEqual(false);
        },
      );
    });
  });

  describe('isExpired', () => {
    it('SHOULD return true', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.EXPIRED)
        .build();
      expect(invite.isExpired()).toEqual(true);
    });

    describe('WHEN status is not equal EXPIRED', () => {
      const statusNotEqualExpiredList = Object.values(InviteStatusEnum).filter(
        (value) => value !== InviteStatusEnum.EXPIRED,
      );

      it.each(statusNotEqualExpiredList)(
        'SHOULD return false (status = %p)',
        (status) => {
          const invite = new InviteAggregateBuilder()
            .withStatusValue(status)
            .build();
          expect(invite.isExpired()).toEqual(false);
        },
      );
    });
  });

  describe('isRevoked', () => {
    it('SHOULD return true', () => {
      const invite = new InviteAggregateBuilder()
        .withStatusValue(InviteStatusEnum.REVOKED)
        .build();
      expect(invite.isRevoked()).toEqual(true);
    });

    describe('WHEN status is not equal REVOKED', () => {
      const statusNotEqualRevokedList = Object.values(InviteStatusEnum).filter(
        (value) => value !== InviteStatusEnum.REVOKED,
      );

      it.each(statusNotEqualRevokedList)(
        'SHOULD return false (status = %p)',
        (status) => {
          const invite = new InviteAggregateBuilder()
            .withStatusValue(status)
            .build();
          expect(invite.isRevoked()).toEqual(false);
        },
      );
    });
  });
});
