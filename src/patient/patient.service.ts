import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepository: Repository<Patient>,
  ) {}
  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }

  async findByEmail(email: string) {
    const p = await this.patientRepository.findOne({
      where: {
        email: email,
      },
      relations: {
        bookingData: {
          allcodeData: true,
          doctorData: true,
        },
      },
      order: {
        bookingData: {
          createdAt: 'DESC',
        },
      },
    });
    if (!p) throw new HttpException('Không có thông tin', HttpStatus.NOT_FOUND);
    return p;
  }

  findAll() {
    return `This action returns all patient`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patient`;
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
