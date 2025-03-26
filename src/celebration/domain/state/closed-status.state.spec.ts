import { CelebrationAggregateBuilder } from '../celebration.aggregate.builder';
import { ClosedStatusState } from './closed-status.state';

describe('ClosedStatusState unit tests', () => {
  const status = new ClosedStatusState();

  it('SHOULD be value equal CLOSED', () => {
    const celebration = new CelebrationAggregateBuilder()
      .withStatus(status)
      .build();
    expect(status.value).toEqual('CLOSED');
  });

  describe('abandon', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.abandon(celebration)).toThrow(
        new Error('Cannot abandon celebration with status equal CLOSED'),
      );
    });
  });

  describe('close', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.close(celebration)).toThrow(
        new Error('Cannot close celebration with status equal CLOSED'),
      );
    });
  });

  describe('confirm', () => {
    it('SHOULD throw an exception', () => {
      const celebration = new CelebrationAggregateBuilder()
        .withStatus(status)
        .build();
      expect(() => status.confirm(celebration)).toThrow(
        new Error('Cannot confirm celebration with status equal CLOSED'),
      );
    });
  });
});
