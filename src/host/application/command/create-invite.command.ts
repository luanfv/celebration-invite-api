export class CreateInviteCommand {
  constructor(
    readonly celebrationId: string,
    readonly guestName: string,
  ) {}
}
