type CreateInviteGuest = {
  name: string;
  age: number;
};

export class CreateInviteCommand {
  constructor(
    readonly celebrationId: string,
    readonly guests: CreateInviteGuest[],
    readonly maxGuest: number,
    readonly expireAt: Date,
  ) {}
}
