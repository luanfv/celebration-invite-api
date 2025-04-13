import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsString, ValidateNested } from 'class-validator';
import { parse } from 'date-fns';

class AddressDto {
  @IsString()
  zipCode: string;

  @IsString()
  street: string;

  @IsNumber()
  number: number;
}

export class CreateCelebrationDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDate()
  @Transform(({ value }) => {
    const [day, month, year] = value.split('/');
    return parse(`${year}-${month}-${day}`, 'yyyy-M-d', new Date());
  })
  date: Date;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}
