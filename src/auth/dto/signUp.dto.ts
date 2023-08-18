import {
    IsString,
    MinLength,
    IsOptional,
    IsNotEmpty,
    IsEmail
  } from 'class-validator';
  
  export class signUpDto {
      @IsNotEmpty()
      @IsString()
      readonly name: string;
    
      @IsNotEmpty()
      @IsEmail({}, {message : 'please enter correct email'})
      readonly email: string;
  
      @IsString()
      @MinLength(6)
      readonly password: string;
  
  }