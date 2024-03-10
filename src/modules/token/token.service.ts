import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly confService: ConfigService,
  ) {}

  async tokenJWT(email, id) {
    const payload = { email, id };
    return await this.jwtService.sign(payload, {
      secret: this.confService.get('jwt_secret'),
      expiresIn: this.confService.get('expires'),
    });
  }
}
