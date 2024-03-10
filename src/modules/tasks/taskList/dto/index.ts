import { IsArray, IsString } from 'class-validator';

export class createTaskListDTO {
  @IsString()
  name: string;

  @IsArray()
  taskItems: string[];
}
