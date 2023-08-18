import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, User } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject : [ConfigService],
      useFactory : (config : ConfigService) => {
        return {
          secret : config.get <string>('JWT_SECRET'),
          signOptions :{
            expiresIn : config.get <string | number>('JWT_EXPIRES')
          } 
        }
      }
    }),
    MongooseModule.forFeature([{name:'User', schema : userSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports :[JwtStrategy, PassportModule]
})
export class AuthModule {}
