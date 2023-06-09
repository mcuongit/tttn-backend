import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PORT || 5001;
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  // app.enableCors({
  //   origin: [
  //     'http://localhost:3000',
  //     'http://localhost:5000',
  //     'http://localhost:5173',
  //     process.env.REACT_URL,
  //     'https://manhcuong-fe.vercel.app/',
  //   ],
  //   credentials: true,
  // });
  await app.listen(port);
  console.log(`Your server is running on http://localhost:${port}`);
}
bootstrap();
