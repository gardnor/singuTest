import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Orders } from '../schema/order.schema';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../../application/dto/createOrder.dto';

@Injectable()
export class CreateOrderRepository {
  constructor(
    @InjectModel(Orders.name)
    private readonly orderModel: Model<Orders>,
  ) {}

  async create(order: CreateOrderDto): Promise<OrderEntity> {
    return await this.orderModel.create(order);
  }
}
