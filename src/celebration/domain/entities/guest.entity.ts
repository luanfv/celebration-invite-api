import { randomUUID } from 'node:crypto';

type GuestProps = {
  name: string;
  hasOverEighteen: boolean;
  age: number;
  obligatory: boolean;
};

export class Guest {
  private _id: string;
  private _props: GuestProps;

  private constructor(id: string, props: GuestProps) {
    this._id = id;
    this._props = props;
  }

  static create(name: string, age: number, obligatory: boolean) {
    if (0 > age) throw new Error('Guest - cannot be less than 0 age');

    return new Guest(randomUUID(), {
      age,
      name,
      obligatory,
      hasOverEighteen: age >= 18,
    });
  }

  isOver(): boolean {
    return this._props.hasOverEighteen;
  }

  get values() {
    return {
      id: this._id,
      name: this._props.name,
      hasOverEighteen: this._props.hasOverEighteen,
      age: this._props.age,
      obligatory: this._props.obligatory,
    };
  }
}
