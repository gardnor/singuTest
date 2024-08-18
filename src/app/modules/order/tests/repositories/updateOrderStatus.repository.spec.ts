import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateOrderStatusRepository } from '../../infrastructure/repositories/updateOrderStatus.repository';
import { Orders } from '../../infrastructure/schema/order.schema';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { IOrder } from '../../domain/interfaces/order.interface';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UpdateOrderStatusRepository', () => {
  let repository: UpdateOrderStatusRepository;
  let model: Model<Orders>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOrderStatusRepository,
        {
          provide: getModelToken(Orders.name),
          useValue: {
            findByIdAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<UpdateOrderStatusRepository>(
      UpdateOrderStatusRepository,
    );
    model = module.get<Model<Orders>>(getModelToken(Orders.name));
  });

  describe('updateStatus', () => {
    it('should update the order status and return the updated order', async () => {
      const id = '123';
      const status = OrderStatusEnum.Ready;
      const updatedOrder = {
        _id: id,
        items: ['item1'],
        status,
      };
      const expectedOrder: IOrder = {
        _id: id,
        items: ['item1'],
        status,
      };

      model.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedOrder);

      const result = await repository.updateStatus(id, status);

      expect(result).toEqual(expectedOrder);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        { status },
        { new: true },
      );
    });

    it('should throw a HttpException if the order is not found', async () => {
      const id = '123';
      const status = OrderStatusEnum.Ready;

      model.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

      await expect(repository.updateStatus(id, status)).rejects.toThrow(
        new HttpException('Order not found', HttpStatus.NOT_FOUND),
      );
    });
  });
});
