import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, ListIds } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import * as fs from 'fs';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // auth
  @UseGuards(AuthGuard())
  @Get('profile')
  async getProfile(@Req() req: any) {
    return req.user;
  }
  // end auth

  @Get('search/:query')
  searchDoctor(@Param('query') query: string) {
    return this.usersService.searchDoctor(query);
  }
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
  getAvatar(
    @Param('imagename') imagename: string,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const filePath = `./uploads/avatars/${imagename}`;
      if (!fs.existsSync(filePath)) {
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('404 Not Found');
        return;
      }
      let contentType = 'text/plain';
      switch (extname(filePath)) {
        case '.png':
          contentType = 'image/png';
          break;
        case '.jpg':
          contentType = 'image/jpeg';
        default:
          break;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
      });
      const file = createReadStream(join(process.cwd(), filePath));
      return new StreamableFile(file);
    } catch (error) {
      throw new Error(error);
    }
  }
}
