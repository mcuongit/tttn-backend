import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateContactDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  phone: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  comment: string;
  statusCode: number;
}
