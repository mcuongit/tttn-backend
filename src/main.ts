import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5001;
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5000',
      'http://localhost:5173',
    ],
    credentials: true,
  });
  await app.listen(port);
  console.log(`Your server is running on http://localhost:${port}`);

  // log routes list
  const server = app.getHttpServer();
  const router = server._events.request._router;

  const existingRoutes: [] = router.stack
    .map((routeObj) => {
      if (routeObj.route) {
        return {
          route: {
            path: routeObj.route?.path,
            method: routeObj.route?.stack[0].method,
          },
        };
      }
    })
    .filter((item) => item !== undefined);
  console.log(existingRoutes);
}
bootstrap();
