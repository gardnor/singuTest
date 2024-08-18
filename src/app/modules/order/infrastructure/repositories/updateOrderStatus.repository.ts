import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from '../schema/order.schema';
import { BaseRepository } from './base.repository';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { IOrder } from '../../domain/interfaces/order.interface';

@Injectable()
export class UpdateOrderStatusRepository extends BaseRepository {
  constructor(
    @InjectModel(Orders.name)
    private readonly orderModel: Model<Orders>,
  ) {
    super();
  }

  async updateStatus(id: string, status: OrderStatusEnum): Promise<IOrder> {
    const updatedOrder: any = await this.orderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!updatedOrder) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    return this.toDomainModel(updatedOrder);
  }
}
