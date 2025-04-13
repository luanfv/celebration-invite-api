import { CelebrationAggregateBuilder } from '../celebration.aggregate.builder';
import { AbandonedStatusState } from './abandoned-status.state';

describe('AbandonedStatusState unit tests', () => {
  const status = new AbandonedStatusState();

  it('SHOULD be value equal ABANDONED', () => {
    const celebration = new CelebrationAggregateBuilder()
      .withStatus(status)
      .build();
    expect(status.value).toEqual('ABANDONED');
  });

  describe('abandon', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.abandon(celebration)).toThrow(
        new Error('Cannot abandon celebration with status equal ABANDONED'),
      );
    });
  });

  describe('close', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.close(celebration)).toThrow(
        new Error('Cannot close celebration with status equal ABANDONED'),
      );
    });
  });

  describe('confirm', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.confirm(celebration)).toThrow(
        new Error('Cannot confirm celebration with status equal ABANDONED'),
      );
    });
  });
});
