import { Module } from '@nestjs/common';
import { MarkdownService } from './markdown.service';
import { MarkdownController } from './markdown.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Markdown } from './entities/markdown.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Markdown])],
  controllers: [MarkdownController],
  providers: [MarkdownService],
})
export class MarkdownModule {}
