export class CelebrationEntity {
  constructor(
    readonly id: string,
    readonly title: string,
    readonly status: string,
    readonly description: string,
    readonly address: {
      street: string;
      zipCode: string;
      number: number;
    },
    readonly date: Date,
    readonly createdAt: Date,
  ) {}
}
