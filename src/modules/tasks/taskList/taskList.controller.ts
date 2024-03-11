import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { TaskListService } from './taskList.service';
import { createTaskListDTO } from './dto';
import { ApiBody, ApiCreatedResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { TaskList } from 'src/models/taskList.entity';

@Controller('task')
export class TaskListController {
  constructor(private readonly taskListService: TaskListService) {}


  @ApiBody({type:createTaskListDTO})
  @UseGuards(JwtAuthGuard)
  @Post('create')
  createTaskList(@Body() dto: createTaskListDTO, @Req() res) {
    return this.taskListService.createTaskList(dto, res.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-all-list')
  findTaskList(@Req() res) {
    return this.taskListService.findAllTaskList(res.user.id);
  }
 
  @ApiParam({
    name: 'taskListId',
    type: Number
  })
  @UseGuards(JwtAuthGuard)
  @Get('find-one-list/:id')
  findOneTaskList(@Param('taskListId') taskListId: number, @Req() res) {
    return this.taskListService.findOneTaskList(taskListId, res.user.id);
  }

  @ApiParam({
    name: 'id',
    type: Number
  })
  @UseGuards(JwtAuthGuard)
  @Patch('updateList/:id')
  updateTaskList(@Param('id') id: number, @Body('updateDescription') updateDescription: string) {
    return this.taskListService.updateTaskList(id, updateDescription);
  }

  @ApiParam({
    name: 'id',
    type: Number
  })
  @UseGuards(JwtAuthGuard)
  @Delete('deleteList/:id')
  DeleteTaskListItems(@Param('id') id: number) {
    return this.taskListService.deleteTaskListAllItems(id);
  }

  @ApiParam({
    name: 'id',
    type: Number
  })
  @UseGuards(JwtAuthGuard)
  @Delete('deleteList/:id')
  DeleteTaskList(@Param('id') id: number) {
    return this.taskListService.deleteTaskListAllList(id);
  }
}
