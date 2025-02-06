import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  app.enableCors({
    origin: ["http://localhost:3000","https://harmless-magical-falcon.ngrok-free.app"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server is running on port ${process.env.PORT}`);
}

bootstrap();
