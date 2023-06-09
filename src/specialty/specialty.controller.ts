import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream } from 'fs';
import * as fs from 'fs';

@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly specialtyService: SpecialtyService) {}

  @Post()
  create(@Body() createSpecialtyDto: CreateSpecialtyDto) {
    return this.specialtyService.create(createSpecialtyDto);
  }

  @Get()
  findAll() {
    return this.specialtyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialtyService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSpecialtyDto: UpdateSpecialtyDto,
  ) {
    return this.specialtyService.update(+id, updateSpecialtyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialtyService.remove(+id);
  }

  // handle upload image
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/specialty',
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

  // get image
  @Get('image/:imagename')
  getAvatar(
    @Param('imagename') imagename: string,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const filePath = `./uploads/specialty/${imagename}`;
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
