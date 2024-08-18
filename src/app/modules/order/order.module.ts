import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Orders, OrderSchema } from './infrastructure/schema/order.schema';
import { MONGO_URI } from './config/config';
import { CreateOrderController } from './application/controllers/createOrder.controller';
import { UpdateOrderStatusController } from './application/controllers/updateOrderStatus.controller';
import { FindAllOrderController } from './application/controllers/findAllOrder.controller';
import { CreateOrderService } from './application/services/createOrder.service';
import { CreateOrderRepository } from './infrastructure/repositories/createOrder.repository';
import { UpdateOrderStatusService } from './application/services/updateOrderStatus.service';
import { UpdateOrderStatusRepository } from './infrastructure/repositories/updateOrderStatus.repository';
import { FindAllOrderRepository } from './infrastructure/repositories/findAllOrder.repository';
import { FindAllOrderService } from './application/services/findAllOrder.service';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
  ],
  controllers: [
    CreateOrderController,
    UpdateOrderStatusController,
    FindAllOrderController,
  ],
  providers: [
    CreateOrderService,
    CreateOrderRepository,
    UpdateOrderStatusService,
    UpdateOrderStatusRepository,
    FindAllOrderService,
    FindAllOrderRepository,
  ],
  exports: [CreateOrderService, UpdateOrderStatusService, FindAllOrderService],
})
export class OrderModule {}
