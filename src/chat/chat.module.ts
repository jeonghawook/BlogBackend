import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';


@Module({

    imports:  [JwtModule.register({})], // Import and configure JwtModule as needed
    providers: [],
    exports: [JwtModule], 
})
export class ChatModule {}
