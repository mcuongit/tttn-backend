import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorInfoDto } from './create-doctor_info.dto';

export class UpdateDoctorInfoDto extends PartialType(CreateDoctorInfoDto) {}
