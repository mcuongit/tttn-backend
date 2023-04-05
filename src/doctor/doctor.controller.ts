import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateMarkdownDto } from 'src/markdown/dto/create-markdown.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('get-all')
  findAllDoctor() {
    return this.doctorService.findAllDoctor();
  }

  @Get('get-doctor-profile/:id')
  findDoctorProfile(@Param('id') id: string) {
    return this.doctorService.getDoctorProfile(+id);
  }

  @Post('save-doctor-info')
  saveDoctor(@Body() body: CreateMarkdownDto) {
    return this.doctorService.saveDoctorInfo(body);
  }

  @Get('get-doctor-detail/:id')
  findOne(@Param('id') id: string) {
    return this.doctorService.findOneDoctor(+id);
  }
}
