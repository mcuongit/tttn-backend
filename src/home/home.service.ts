import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
// import { CreateHomeDto } from './dto/create-home.dto';
// import { UpdateHomeDto } from './dto/update-home.dto';

@Injectable()
export class HomeService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // create(createHomeDto: CreateHomeDto) {
  //   return 'This action adds a new home';
  // }

  async findAll(limit: number) {
    const lim = limit ? limit : 10;
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.bookingData', 'booking')
      .leftJoinAndSelect('user.positionData', 'position')
      .leftJoinAndSelect('user.genderData', 'gender')
      .leftJoinAndSelect('user.roleData', 'role')
      .where('user.roleId = :r', { r: UserRole.DOCTOR })
      .addSelect('count(booking.id)', 'dCount')
      .groupBy('user.id')
      .addGroupBy('booking.id')
      .orderBy('dCount', 'DESC')
      .limit(lim)
      .getMany();
    // console.log('------------------------------------------');
    // console.log(doctors);
    // console.log('------------------------------------------');
    // return await this.userRepository.find({
    //   select: {
    //     positionData: {
    //       key: true,
    //       type: true,
    //       valueVi: true,
    //     },
    //     genderData: {
    //       key: true,
    //       type: true,
    //       valueVi: true,
    //     },
    //     roleData: {
    //       key: true,
    //       type: true,
    //       valueVi: true,
    //     },
    //   },
    //   relations: {
    //     positionData: true,
    //     genderData: true,
    //     roleData: true,
    //   },
    //   where: {
    //     roleId: UserRole.DOCTOR,
    //   },
    //   take: lim,
    // });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} home`;
  // }

  // update(id: number, updateHomeDto: UpdateHomeDto) {
  //   return `This action updates a #${id} home`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} home`;
  // }
}
