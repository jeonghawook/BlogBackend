import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'database.cbexcccq21ba.ap-northeast-2.rds.amazonaws.com',
    port: 5432,
    username: 'postgres',
    password: 'gkdnr8785',
    database: 'database',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true, // Only for develnpmopment. Set to false in production.
};

export default config;
