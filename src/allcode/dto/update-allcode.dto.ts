import { PartialType } from '@nestjs/mapped-types';
import { CreateAllcodeDto } from './create-allcode.dto';

export class UpdateAllcodeDto extends PartialType(CreateAllcodeDto) {}
