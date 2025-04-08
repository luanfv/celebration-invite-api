import { randomUUID } from 'node:crypto';
import { Guest } from './guest.entity';

describe('Guest entity unit tests', () => {
  describe('create', () => {
    it('SHOULD return a guest', () => {
      const inviteId = randomUUID();
      const result = Guest.create('John', inviteId);
      expect(result.values).toEqual({
        id: expect.any(String),
        name: 'John',
        inviteId,
      });
    });
  });
});
