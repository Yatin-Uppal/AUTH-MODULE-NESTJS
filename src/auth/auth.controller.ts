import { Controller, Post, Body, Get} from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUp.dto';
import { loginDto } from './dto/login.dto';
import { changePasswordDto } from './dto/changePassword.dto';
import { User } from './schemas/user.schema';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body() signUpDto: signUpDto) : Promise <{token : string}> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: loginDto) : Promise <{token : string}> {
    return this.authService.login(loginDto);
  }

  @Post('/changePassword')
  changePassword(@Body() changePasswordDto: changePasswordDto) : Promise <User> {
    return this.authService.changePassword(changePasswordDto);
  }
}
