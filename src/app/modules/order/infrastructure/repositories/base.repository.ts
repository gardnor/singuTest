import { Injectable } from '@nestjs/common';
import { Orders } from '../schema/order.schema';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { IOrder } from '../../domain/interfaces/order.interface';

@Injectable()
export class BaseRepository {
  constructor() {}

  protected toDomainModel(order: IOrder): IOrder {
    return {
      _id: order._id,
      items: order.items,
      status: order.status as OrderStatusEnum,
    };
  }

  protected toPersistenceModel(order: Orders): Orders {
    return {
      _id: order._id,
      items: order.items,
      status: order.status,
    } as Orders;
  }
}
