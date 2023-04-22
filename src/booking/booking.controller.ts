import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('post-book-apointment')
  findOrCreate(@Body() data: any) {
    return this.bookingService.findOrCreate(data);
  }

  @Get('getPatientList/:doctorId/:date')
  findByDoctorAndDate(
    @Param('doctorId') doctorId: string,
    @Param('date') date: string,
  ) {
    return this.bookingService.findByDoctorAndDate(+doctorId, date);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @Post('verify-booking')
  findOne(@Body() data: any) {
    return this.bookingService.findOne(data);
  }
}
