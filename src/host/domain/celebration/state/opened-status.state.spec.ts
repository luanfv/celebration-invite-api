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

  describe('close', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.close(celebration)).toThrow(
        new Error('Cannot close celebration with status equal OPENED'),
      );
    });
  });

  describe('confirm', () => {
    it('SHOULD change status by celebration to CLOSED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      status.confirm(celebration);
      expect(celebration.status).toEqual('CONFIRMED');
    });
  });
});
