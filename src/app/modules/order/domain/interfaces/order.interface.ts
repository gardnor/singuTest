import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

export interface IOrder {
  _id: string;
  items: string[];
  status: OrderStatusEnum;
}
