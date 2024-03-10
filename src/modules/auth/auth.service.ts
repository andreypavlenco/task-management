import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { TokenService } from '../token/token.service';
import { authLoginDTO } from './dto';
import { createUserDTO } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async registration(dto: createUserDTO) {
    const findEmailUser = await this.userService.findOneUserEmail(dto.email);

    if (findEmailUser) throw new BadRequestException('The user already exists');
    await this.userService.createNewUser(dto);
    return dto;
  }

  async login(dto: authLoginDTO) {
    const findEmailUser = await this.userService.findOneUserEmail(dto.email);
    if (!findEmailUser)
      throw new BadRequestException('The user already exists');
      const passwordCompare = bcrypt.compare(
      dto.password,
      findEmailUser.password,
    );
    if (!passwordCompare)
      throw new BadRequestException('The date already exists');
    const token = await this.tokenService.tokenJWT(
      findEmailUser.email,
      findEmailUser.id,
    );
    return { dto, token };
  }
}
