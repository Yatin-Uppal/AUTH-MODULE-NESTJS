import {
    IsEmail,
    IsString,
    MinLength,
    IsNotEmpty,
  } from 'class-validator';
  
  export class changePasswordDto {
    
      @IsNotEmpty()
      @IsEmail({}, { message : 'please enter correct email'})
      readonly email: string;
  
      @IsString()
      @MinLength(6)
      readonly currentPassword: string;

      @IsString()
      @MinLength(6)
      readonly newPassword: string;
  
  }