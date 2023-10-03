import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [

    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        readyLog: true,
        config: [
          {
            namespace: configService.get<string>('REDIS_NAME'),
            host: configService.get<string>('REDIS_HOST'),
            port: configService.get<number>('REDIS_PORT'),
            password: configService.get<string>('REDIS_PASSWORD'),
          },
        ],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class InMemoryModule {}
