import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class authLoginDTO {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
