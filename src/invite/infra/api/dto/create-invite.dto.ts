import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { parse } from 'date-fns';

class GuestDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;
}

export class CreateInviteBodyDto {
  @IsNumber()
  maxGuest: number;

  @IsDate({
    message: 'expireAt must be a date (dd/mm/yyyy)',
  })
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return parse(`${year}-${month}-${day}`, 'yyyy-M-d', new Date());
  })
  expireAt: Date;

  @ValidateNested()
  @Type(() => GuestDto)
  @IsArray()
  guests: GuestDto[];
}

export class CreateInviteParamsDto {
  celebrationId: string;
}
