import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindAllOrderService } from '../services/findAllOrder.service';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { swaggerExamples } from '../../infrastructure/common/swagger.constants';

@ApiTags('Order')
@Controller('orders')
export class FindAllOrderController {
  constructor(private readonly orderService: FindAllOrderService) {}

  @Get()
  @ApiOperation({ summary: 'Find all orders' })
  @ApiResponse({
    status: 200,
    description: 'The order status has been successfully updated.',
    example: [swaggerExamples.returnOrderExample],
  })
  @ApiResponse({
    status: 404,
    description: 'Not found',
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
    description: 'Page number',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Number of items per page',
  })
  @ApiQuery({
    name: 'status',
    enum: OrderStatusEnum,
    required: false,
    description: 'Filter by status',
  })
  async findAllOrders(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('status') status?: OrderStatusEnum,
  ) {
    return this.orderService.findAll(page, limit, status);
  }
}
