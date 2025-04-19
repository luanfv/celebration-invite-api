import { IsString } from 'class-validator';

export class OpenCelebrationParamDto {
  @IsString()
  celebrationId: string;
}
