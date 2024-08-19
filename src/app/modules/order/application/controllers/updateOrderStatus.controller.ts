import { Controller, Patch, Body, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';
import { UpdateOrderStatusService } from '../services/updateOrderStatus.service';
import { UpdateOrderStatusDto } from '../dto/updateOrderStatus.dto';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { swaggerExamples } from '../../infrastructure/common/swagger.constants';

@ApiTags('Order')
@Controller('orders')
export class UpdateOrderStatusController {
  constructor(private readonly orderService: UpdateOrderStatusService) {}

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({
    status: 200,
    description: 'The order status has been successfully updated.',
    example: swaggerExamples.returnOrderExample,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the order to update',
  })
  @ApiBody({
    type: UpdateOrderStatusDto,
    examples: {
      InPreparation: {
        summary: 'Status InPreparation',
        value: { status: OrderStatusEnum.InPreparation },
      },
      Ready: {
        summary: 'Status Ready',
        value: { status: OrderStatusEnum.Ready },
      },
      Delivered: {
        summary: 'Status Delivered',
        value: { status: OrderStatusEnum.Delivered },
      },
    },
  })
  async updateStatus(
    @Param('id') id: string,
    @Body() { status }: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(id, status);
  }
}
