import { Controller, Get, Param } from '@nestjs/common';
import { AllcodeService } from './allcode.service';
// import { CreateAllcodeDto } from './dto/create-allcode.dto';
// import { UpdateAllcodeDto } from './dto/update-allcode.dto';

@Controller('allcode')
export class AllcodeController {
  constructor(private readonly allcodeService: AllcodeService) {}

  // @Post()
  // create(@Body() createAllcodeDto: CreateAllcodeDto) {
  //   return this.allcodeService.create(createAllcodeDto);
  // }

  @Get()
  findAll() {
    return this.allcodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') type: string) {
    return this.allcodeService.findOne(type);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAllcodeDto: UpdateAllcodeDto) {
  //   return this.allcodeService.update(+id, updateAllcodeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.allcodeService.remove(+id);
  // }
}
