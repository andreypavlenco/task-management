import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createUserDTO } from './dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOneUserEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async createNewUser(dto: createUserDTO) {

    try{
      const validatPassword = await this.hashPassword(dto.password);
    dto.password = validatPassword;
    await this.userRepository.save({
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });
    return dto;
    }catch(error){
      return new BadRequestException('The user has not registered', { cause: new Error(), description: 'The user has not registered'})
    }
    
  }
}
