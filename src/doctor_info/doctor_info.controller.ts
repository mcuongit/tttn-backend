import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorInfoService } from './doctor_info.service';
import { CreateDoctorInfoDto } from './dto/create-doctor_info.dto';
import { UpdateDoctorInfoDto } from './dto/update-doctor_info.dto';

@Controller('doctor-info')
export class DoctorInfoController {
  constructor(private readonly doctorInfoService: DoctorInfoService) {}

  @Post()
  create(@Body() createDoctorInfoDto: CreateDoctorInfoDto) {
    return this.doctorInfoService.create(createDoctorInfoDto);
  }

  @Get()
  findAll() {
    return this.doctorInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorInfoService.findOne(+id);
  }

  @Get('get-by-spec/:id/:prov')
  findBySpec(@Param('id') id: string, @Param('prov') province: string) {
    return this.doctorInfoService.findAllBySpecId(+id, province);
  }

  @Get('get-by-id/:id')
  findById(@Param('id') id: string) {
    return this.doctorInfoService.findDoctorExtraInfo(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDoctorInfoDto: UpdateDoctorInfoDto,
  ) {
    return this.doctorInfoService.update(+id, updateDoctorInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorInfoService.remove(+id);
  }
}
