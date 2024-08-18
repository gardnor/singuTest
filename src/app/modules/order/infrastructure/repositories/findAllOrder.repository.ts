import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from '../schema/order.schema';
import { OrderEntity } from '../../domain/entities/order.entity';
import { BaseRepository } from './base.repository';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

@Injectable()
export class FindAllOrderRepository extends BaseRepository {
  constructor(
    @InjectModel(Orders.name)
    private readonly orderModel: Model<Orders>,
  ) {
    super();
  }

  async findAll(
    page?: number,
    limit?: number,
    status?: OrderStatusEnum,
  ): Promise<OrderEntity[]> {
    const query = status ? { status } : null;
    const orders = await this.orderModel
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return orders.map(this.toDomainModel.bind(this));
  }
}
