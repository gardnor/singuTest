import { Controller, Post, Body } from '@nestjs/common';
import { CreateOrderDto } from '../dto/createOrder.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateOrderService } from '../services/createOrder.service';
import { swaggerExamples } from '../../infrastructure/common/swagger.constants';

@ApiTags('Order')
@Controller('orders')
export class CreateOrderController {
  constructor(private readonly orderService: CreateOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new order' })
  @ApiResponse({
    status: 201,
    description: 'The order has been successfully created.',
    type: CreateOrderDto,
    example: swaggerExamples.returnOrderExample,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }
}
