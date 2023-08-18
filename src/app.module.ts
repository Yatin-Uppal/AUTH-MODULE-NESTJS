import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath : '.env',
      isGlobal : true
    }),
  MongooseModule.forRoot(process.env.DB_URI), 
/*MongooseModule.forRoot(
    'mongodb+srv://cluster0.2c0tbhx.mongodb.net',
    {
      user: 'sachin',
      pass: 'Dibon@2023',
      dbName: 'credentials-management',
      w: 'majority',
      retryWrites: true
    }
  ),  */
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
