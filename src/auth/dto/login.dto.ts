import {
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
  } from 'class-validator';
  
  export class loginDto {
    
      @IsNotEmpty()
      @IsEmail({}, { message : 'please enter correct email'})
      readonly email: string;
  
      @IsString()
      @MinLength(6)
      readonly password: string;
  
  }