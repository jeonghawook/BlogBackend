import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'database2',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Only for develnpmopment. Set to false in production.
};

export default config;
