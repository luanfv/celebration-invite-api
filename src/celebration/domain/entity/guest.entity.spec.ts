import { Guest } from './guest.entity';

describe('Guest entity unit tests', () => {
  it('SHOULD create a guest', () => {
    const guest = Guest.create('user1', 19, false);
    expect(guest.values).toEqual({
      id: expect.any(String),
      name: 'user1',
      hasOverEighteen: true,
      age: 19,
      obligatory: false,
    });
  });

  describe('WHEN receive less than 0 age', () => {
    it('SHOULD throw an error', () => {
      expect(() => Guest.create('user1', -1, true)).toThrow();
    });
  });

  describe('WHEN call isOver method AND the guest has not over eighteen', () => {
    it.each`
      name       | age   | obligatory
      ${'user1'} | ${17} | ${true}
      ${'user2'} | ${10} | ${true}
      ${'user3'} | ${5}  | ${true}
      ${'user3'} | ${0}  | ${true}
    `('SHOULD return false', ({ name, age, obligatory }) => {
      const guest = Guest.create(name, age, obligatory);
      expect(guest.isOver()).toEqual(false);
    });
  });

  describe('WHEN call isOver method AND the guest has over eighteen', () => {
    it.each`
      name       | age    | obligatory
      ${'user1'} | ${18}  | ${true}
      ${'user2'} | ${20}  | ${true}
      ${'user3'} | ${70}  | ${true}
      ${'user3'} | ${100} | ${true}
    `('SHOULD return true', ({ name, age, obligatory }) => {
      const guest = Guest.create(name, age, obligatory);
      expect(guest.isOver()).toEqual(true);
    });
  });
});
