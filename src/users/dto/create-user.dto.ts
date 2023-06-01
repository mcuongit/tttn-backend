import { IsEmail } from 'class-validator';
import { UserGender, UserRole } from '../entities/user.entity';

export class CreateUserDto {
  firstName: string;
  lastName: string;
  @IsEmail() email: string;
  password: string;
  gender: UserGender;
  address: string;
  positionId: string;
  phone: string;
  roleId: UserRole;
  image: string;
}

export class ListIds {
  ids: [];
}
