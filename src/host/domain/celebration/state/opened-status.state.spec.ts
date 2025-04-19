import { CelebrationAggregateBuilder } from '../celebration.aggregate.builder';
import { OpenedStatusState } from './opened-status.state';

describe('OpenedStatusState unit tests', () => {
  const status = new OpenedStatusState();

  it('SHOULD be value equal OPENED', () => {
    expect(status.value).toEqual('OPENED');
  });

  describe('abandon', () => {
    it('SHOULD change status by celebration to ABANDONED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      status.abandon(celebration);
      expect(celebration.status).toEqual('ABANDONED');
    });
  });

  describe('confirm', () => {
    it('SHOULD change status by celebration to CONFIRMED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      status.confirm(celebration);
      expect(celebration.status).toEqual('CONFIRMED');
    });
  });
});
