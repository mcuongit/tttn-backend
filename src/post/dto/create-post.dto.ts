import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  catId: number;
  @IsNotEmpty()
  html: string;
  @IsNotEmpty()
  markdown: string;
  image: string;
}
