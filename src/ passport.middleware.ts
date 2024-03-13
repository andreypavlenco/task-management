import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from './models/user.entity';

export interface UserRequest extends Request {
  user: User;
}
@Injectable()
export class PassportMiddleware implements NestMiddleware {
  use(req: UserRequest, res: Response, next: NextFunction) {
    next();
  }
}
