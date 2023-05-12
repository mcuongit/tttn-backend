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
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }
  @Get('get-post/:limit')
  findPostLimit(@Param('limit') limit: string) {
    return this.postService.findLimitPost(+limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }

  // handle upload image
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/posts',
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
    return { imagePath: file.path, name: file.filename };
  }
  @Get('image/:imagename')
  getAvatar(
    @Param('imagename') imagename: string,
    @Res({ passthrough: true }) res,
  ) {
    try {
      const filePath = `./uploads/posts/${imagename}`;
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
      const file = fs.createReadStream(join(process.cwd(), filePath));
      return new StreamableFile(file);
    } catch (error) {
      throw new Error(error);
    }
  }
}
