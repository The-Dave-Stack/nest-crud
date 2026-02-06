import configuration, { getEnvFilePath } from './config/configuration';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
      envFilePath: getEnvFilePath(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
