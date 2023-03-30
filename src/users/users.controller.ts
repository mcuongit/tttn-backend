import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ListIds } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Res, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete('/del-mul')
  delMuls(@Body() listIds: ListIds) {
    return this.usersService.delMultiples(listIds);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // handle upload image
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
    return { imagePath: file.path, name: file.filename };
  }

  @Get('avatar/:imagename')
  async getAvatar(@Param('imagename') imagename, @Res() res) {
    const img = createReadStream(
      join(process.cwd(), `uploads/avatars/${imagename}`),
    );
    img.pipe(res);
  }
}
