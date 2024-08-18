import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

@Schema()
export class Orders extends Document {
  @Prop({ type: [String], required: true })
  items: string[];

  @Prop({
    type: String,
    enum: OrderStatusEnum,
    default: OrderStatusEnum.InPreparation,
  })
  status: OrderStatusEnum;
}

export const OrderSchema = SchemaFactory.createForClass(Orders);
