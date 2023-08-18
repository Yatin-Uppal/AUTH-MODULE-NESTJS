import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs' ;
import { UnauthorizedException } from '@nestjs/common/exceptions';
import * as mongoose from 'mongoose'
import { User } from './schemas/user.schema';

@Injectable()
export class AuthService implements OnModuleInit{
  constructor(
    @InjectModel(User.name)
    private userModel : mongoose.Model<User>,
    private jwtService : JwtService
  ){}

  // onModuleInit() is executed before the app bootstraped
  async onModuleInit() {
    try {
      const res = await this.findUserWithEmail('pm@talentelgia.in'); 
      if (!res) {
        const newUser = {
          name: 'pmTalentelgia',
          email: 'pm@talentelgia.in',
          password: await bcrypt.hash('Dibon@2023', 10),
        };
        const user = await this.userModel.create(newUser);
      }
    } catch (error) {
      throw error;
    }
  }

  async signUp(signUpDto) : Promise<{token : string}> {
    const {name, email, password} = signUpDto;
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.userModel.create({
      name,
      email,
      password : hashedPassword
    })
    const token = this.jwtService.sign({id : user._id})
    return {token};
  }

  async login(loginDto) : Promise<{user : User, token : string}> {
    const {email, password} = loginDto;

    const user = await this.userModel.findOne({
      email,
    })
    if (!user){
      throw new UnauthorizedException('invalid email or password')
    }
    const isPasswordMatched =  await bcrypt.compare(password, user.password);

    if(!isPasswordMatched){
      throw new UnauthorizedException('invalid email or password')
    }

    const token = this.jwtService.sign({id : user._id})
    return {user, token};
  }

  async changePassword(changePasswordDto) : Promise<User> {
    const {email, currentPassword, newPassword} = changePasswordDto;

    const user = await this.userModel.findOne({
      email,
    })
    if (!user){
      throw new UnauthorizedException('invalid email')
    }
    const isCurrentPasswordMatched =  await bcrypt.compare(currentPassword, user.password);

    if(!isCurrentPasswordMatched){
      throw new UnauthorizedException('invalid email or password')
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    const userNewDetails = await this.userModel.findOneAndUpdate({email}, {password : hashedPassword});
    return userNewDetails;
  }

  async findUserWithEmail(email: string, exceptQuery = {}): Promise<User> {
    if (!email) {
      return Promise.reject(new Error(`Cannot find user with email of: ${email}`));
    }

    return await this.userModel.findOne({
      email,
      ...exceptQuery
    }).exec();
  }
}

