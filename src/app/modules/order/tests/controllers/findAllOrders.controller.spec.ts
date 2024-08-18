import { Test, TestingModule } from '@nestjs/testing';
import { FindAllOrderController } from '../../application/controllers/findAllOrder.controller';
import { FindAllOrderService } from '../../application/services/findAllOrder.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, Orders } from '../../infrastructure/schema/order.schema';
import { MONGO_URI } from '../../config/config';

describe('FindAllOrderController', () => {
  let controller: FindAllOrderController;
  let service: FindAllOrderService;

  beforeEach(async () => {
    const mockFindAll = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(MONGO_URI),
        MongooseModule.forFeature([{ name: Orders.name, schema: OrderSchema }]),
      ],
      providers: [
        FindAllOrderService,
        {
          provide: FindAllOrderService,
          useValue: {
            findAll: mockFindAll,
          },
        },
      ],
      controllers: [FindAllOrderController],
    }).compile();

    controller = module.get<FindAllOrderController>(FindAllOrderController);
    service = module.get<FindAllOrderService>(FindAllOrderService);

    mockFindAll.mockResolvedValue([
      {
        _id: '66c18030b4eb9b49443b9db4',
        items: ['item1', 'item2'],
        status: 'InPreparation',
        __v: 0,
      },
    ]);
  });

  it('should return a list of orders', async () => {
    const result = await controller.findAllOrders();

    expect(result).toEqual([
      {
        _id: '66c18030b4eb9b49443b9db4',
        items: ['item1', 'item2'],
        status: 'InPreparation',
        __v: 0,
      },
    ]);
    expect(service.findAll).toHaveBeenCalled();
    expect(service.findAll).toHaveBeenCalledTimes(1);
  });
});
