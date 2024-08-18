import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderRepository } from '../../infrastructure/repositories/createOrder.repository';
import { Orders } from '../../infrastructure/schema/order.schema';
import { OrderEntity } from '../../domain/entities/order.entity';
import { CreateOrderDto } from '../../application/dto/createOrder.dto';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

describe('CreateOrderRepository', () => {
  let repository: CreateOrderRepository;
  let model: Model<Orders>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateOrderRepository,
        {
          provide: getModelToken(Orders.name),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CreateOrderRepository>(CreateOrderRepository);
    model = module.get<Model<Orders>>(getModelToken(Orders.name));
  });

  describe('create', () => {
    it('should create and return an order entity', async () => {
      const createOrderDto: CreateOrderDto = {
        items: ['pizza', 'coca lata'],
      };

      const createdOrder = {
        _id: 'someId',
        items: createOrderDto.items,
        status: OrderStatusEnum.InPreparation
      };

      model.create = jest.fn().mockResolvedValue(createdOrder);

      const result = await repository.create(createOrderDto);

      expect(result).toEqual(createdOrder);
      expect(model.create).toHaveBeenCalledWith(createOrderDto);
    });
  });
});
