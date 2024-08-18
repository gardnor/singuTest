import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { Orders } from '../../infrastructure/schema/order.schema';
import { FindAllOrderRepository } from '../../infrastructure/repositories/findAllOrder.repository';

describe('FindAllOrderRepository', () => {
  let repository: FindAllOrderRepository;
  let model: Model<Orders>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllOrderRepository,
        {
          provide: getModelToken(Orders.name),
          useValue: {
            find: jest.fn(),
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<FindAllOrderRepository>(FindAllOrderRepository);
    model = module.get<Model<Orders>>(getModelToken(Orders.name));
  });

  describe('findAll', () => {
    it('should return a list of order entities', async () => {
      const page = 1;
      const limit = 10;
      const status = OrderStatusEnum.InPreparation;
      const ordersFromDb = [
        { _id: '1', items: ['item1'], status },
        { _id: '2', items: ['item2'], status },
      ];
      const expectedOrders = ordersFromDb.map((order) => ({
        _id: order._id,
        items: order.items,
        status: order.status,
      }));

      model.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(ordersFromDb),
      });

      const result = await repository.findAll(page, limit, status);

      expect(result).toEqual(expectedOrders);
      expect(model.find).toHaveBeenCalledWith({ status });
      expect(model.find().skip).toHaveBeenCalledWith((page - 1) * limit);
      expect(model.find().limit).toHaveBeenCalledWith(limit);
    });

    it('should return a list of order entities without status filter', async () => {
      const page = 2;
      const limit = 5;
      const ordersFromDb = [
        { _id: '3', items: ['item3'], status: OrderStatusEnum.Ready },
        { _id: '4', items: ['item4'], status: OrderStatusEnum.Delivered },
      ];
      const expectedOrders = ordersFromDb.map((order) => ({
        _id: order._id,
        items: order.items,
        status: order.status,
      }));

      model.find = jest.fn().mockReturnValue({
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(ordersFromDb),
      });

      const result = await repository.findAll(page, limit, null);

      expect(result).toEqual(expectedOrders);
      expect(model.find).toHaveBeenCalledWith(null);
      expect(model.find().skip).toHaveBeenCalledWith((page - 1) * limit);
      expect(model.find().limit).toHaveBeenCalledWith(limit);
    });
  });
});
