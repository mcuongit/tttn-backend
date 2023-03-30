import { Controller, Get, Param } from '@nestjs/common';
import { HomeService } from './home.service';
// import { CreateHomeDto } from './dto/create-home.dto';
// import { UpdateHomeDto } from './dto/update-home.dto';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  // @Post()
  // create(@Body() createHomeDto: CreateHomeDto) {
  //   return this.homeService.create(createHomeDto);
  // }
  @Get('get-top-doctor/:limit')
  findAll(@Param('limit') limit: number) {
    return this.homeService.findAll(+limit);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.homeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateHomeDto: UpdateHomeDto) {
  //   return this.homeService.update(+id, updateHomeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.homeService.remove(+id);
  // }
}
