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
import { IOrder } from '../../domain/interfaces/order.interface';

const orderReturnEx: IOrder = {
  _id: '66c17c2c5e3f6d01a6ef49a0',
  items: ['pizza', 'coca lata'],
  status: OrderStatusEnum.Ready,
};

@ApiTags('Order')
@Controller('orders')
export class UpdateOrderStatusController {
  constructor(private readonly orderService: UpdateOrderStatusService) {}

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update order status' })
  @ApiResponse({
    status: 200,
    description: 'The order status has been successfully updated.',
    example: orderReturnEx,
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
