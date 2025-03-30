import { CelebrationAggregateBuilder } from '../celebration.aggregate.builder';
import { ConfirmedStatusState } from './confirmed-status.state';

describe('ConfirmedStatusState unit tests', () => {
  const status = new ConfirmedStatusState();

  it('SHOULD be value equal CONFIRMED', () => {
    expect(status.value).toEqual('CONFIRMED');
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
    it('SHOULD change status by celebration to CLOSED', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      status.close(celebration);
      expect(celebration.status).toEqual('CLOSED');
    });
  });

  describe('confirm', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.confirm(celebration)).toThrow(
        new Error('Cannot confirm celebration with status equal CONFIRMED'),
      );
    });
  });
});
