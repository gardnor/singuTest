import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

export const swaggerExamples = {
  returnOrderExample: {
    _id: '66c17c2c5e3f6d01a6ef49a0',
    items: ['pizza', 'coca lata'],
    status: OrderStatusEnum.Ready,
  },
};