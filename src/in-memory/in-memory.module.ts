import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';


@Module({
    imports: [
        RedisModule.forRoot({
            readyLog: true,
            config: [
                {
                    namespace: process.env.REDIS_NAME,
                    host: process.env.REDIS_HOST,
                    port: parseInt(process.env.REDIS_PORT)
                    ,
                    password: process.env.REDIS_PASSWORD
                },
            ]
        })
    ]
})
export class InMemoryModule { }
