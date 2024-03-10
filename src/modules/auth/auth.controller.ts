import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authLoginDTO } from './dto';
import { createUserDTO } from '../user/dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/registration')
  authRegistration(@Body() dto: createUserDTO) {
    return this.authService.registration(dto);
  }

  @Post('/login')
  authLogin(@Body() dto: authLoginDTO) {
    return this.authService.login(dto);
  }
}
