import { CelebrationAggregateBuilder } from '../celebration.aggregate.builder';
import { DraftStatusState } from './draft-status.state';

describe('DraftStatusState unit tests', () => {
  const status = new DraftStatusState();

  it('SHOULD be value equal DRAFT', () => {
    expect(status.value).toEqual('DRAFT');
  });

  describe('open', () => {
    it('SHOULD change status by celebration to OPENED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      status.open(celebration);
      expect(celebration.status).toEqual('OPENED');
    });
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
});
