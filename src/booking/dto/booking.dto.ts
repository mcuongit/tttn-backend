import { IsEmail, IsNotEmpty } from 'class-validator';
export class BookingDto {
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
  statusId: string;
  @IsNotEmpty()
  doctorId: number;
  patientId: string;
  date: Date;
  timeType: string;
  timeString: string;
  doctorName: string;
}
