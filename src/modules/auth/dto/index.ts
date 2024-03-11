import { IsString } from 'class-validator';

export class authLoginDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
