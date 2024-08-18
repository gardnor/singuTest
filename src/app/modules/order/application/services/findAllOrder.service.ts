import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../../domain/entities/order.entity';
import { FindAllOrderRepository } from '../../infrastructure/repositories/findAllOrder.repository';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

@Injectable()
export class FindAllOrderService {
  constructor(private orderRepository: FindAllOrderRepository) {}

  async findAll(
    page?: number,
    limit?: number,
    status?: OrderStatusEnum,
  ): Promise<OrderEntity[]> {
    return this.orderRepository.findAll(page, limit, status);
  }
}
