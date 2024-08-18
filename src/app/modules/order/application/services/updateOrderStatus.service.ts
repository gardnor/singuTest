import { Injectable } from '@nestjs/common';
import { UpdateOrderStatusRepository } from '../../infrastructure/repositories/updateOrderStatus.repository';
import { IOrder } from '../../domain/interfaces/order.interface';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

@Injectable()
export class UpdateOrderStatusService {
  constructor(private orderRepository: UpdateOrderStatusRepository) {}

  async updateStatus(id: string, status: OrderStatusEnum): Promise<IOrder> {
    return this.orderRepository.updateStatus(id, status);
  }
}
