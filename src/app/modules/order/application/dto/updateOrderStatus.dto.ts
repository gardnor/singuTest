import { IsNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

export class UpdateOrderStatusDto {
  @ApiProperty({
    description: 'Status to update the order',
    enum: OrderStatusEnum,
    example: OrderStatusEnum.InPreparation,
  })
  @IsNotEmpty()
  @IsEnum(OrderStatusEnum, { each: true, message: 'Invalid order status' })
  readonly status: OrderStatusEnum;

  constructor(status: OrderStatusEnum) {
    this.status = status;
  }
}
