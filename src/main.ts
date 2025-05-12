import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';
import { ZodExceptionFilter } from './common/filters/zod-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaExceptionFilter());
  app.useGlobalFilters(new ZodExceptionFilter());
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Listening on port ${port}`);
}
void bootstrap();
