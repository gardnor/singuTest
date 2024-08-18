import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/createOrder.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderRepository } from '../../infrastructure/repositories/createOrder.repository';

@Injectable()
export class CreateOrderService {
  constructor(private orderRepository: CreateOrderRepository) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    return this.orderRepository.create(createOrderDto);
  }
}
