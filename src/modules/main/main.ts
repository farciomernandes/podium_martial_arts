import { Logger, type NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Setups } from './setups';
import { AppModule } from './app.module';

async function bootstrap() {
  const configModule: NestApplicationOptions = {};

  configModule.logger = new Logger();

  const app = await NestFactory.create(AppModule, configModule);

  await Setups.setApp(app).middlewares().startDependencies();

  Setups.setApp(app).swagger();

  await app.listen(process.env.APP_PORT ?? 3000);
}

bootstrap().catch((e) => {
  console.error(e);
});
