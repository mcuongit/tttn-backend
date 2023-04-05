export class CreateBookingDto {
  statusId: string;
  doctorId: number;
  patientId: string;
  date: Date;
  timeType: string;
}
