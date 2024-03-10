import { Body, Controller, Delete, Get, Param, Patch, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/guards/jwt-auth.guard';
import { TaskItemService } from './taskItem.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('taskItem')
export class TaskItemController {
  constructor(private readonly taskItemService: TaskItemService) {}

  @ApiParam({
    name: 'listId',
    type: Number
  })
  @ApiParam({
    name: 'itemId',
    type: Number
  })
  @UseGuards(JwtAuthGuard)
  @Patch('updateItem/:listId/:itemId')
  updateTaskItem(@Param('listId') listId: number, @Param('itemId') itemId: number, @Req() req , @Body('descrition')  descrition : string) {
    console.log(listId, itemId,descrition); 
     return this.taskItemService.updateTaskItem(
       listId,
       itemId,
       descrition,
       req.user.id,
  );
}
@UseGuards(JwtAuthGuard)
@Delete('deleteItem/:itemId')
deleteTaskItem(@Param('itemId') itemId: number) {
  return this.taskItemService.deleteTaskItem(
    itemId
);
}
}
  