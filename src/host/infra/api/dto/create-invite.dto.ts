import { IsString } from 'class-validator';

export class CreateInviteParamDto {
  @IsString()
  celebrationId: string;
}

export class CreateInviteDto {
  @IsString()
  guestName: string;
}
