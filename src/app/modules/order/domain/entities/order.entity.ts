import { OrderStatusEnum } from '../enums/orderStatus.enum';

export class OrderEntity {
  constructor(
    public items: string[],
    public status: OrderStatusEnum,
  ) {}
}
