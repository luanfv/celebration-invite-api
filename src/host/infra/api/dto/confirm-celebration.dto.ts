import { IsString } from 'class-validator';

export class ConfirmCelebrationParamDto {
  @IsString()
  celebrationId: string;
}
