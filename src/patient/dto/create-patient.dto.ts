import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  fullName: string;
  @IsNotEmpty()
  gender: string;
  @IsNotEmpty()
  birthday: string;
  @IsNotEmpty()
  address: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  reason: string;
  phone: string;
}
