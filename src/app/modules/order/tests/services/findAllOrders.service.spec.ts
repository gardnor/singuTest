import { Test, TestingModule } from '@nestjs/testing';
import { FindAllOrderService } from '../../application/services/findAllOrder.service';
import { FindAllOrderRepository } from '../../infrastructure/repositories/findAllOrder.repository';
import { Orders } from '../../infrastructure/schema/order.schema';
import { getModelToken } from '@nestjs/mongoose';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

describe('FindAllOrderService', () => {
  let service: FindAllOrderService;
  let repository: FindAllOrderRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllOrderService,
        {
          provide: FindAllOrderRepository,
          useValue: {
            findAll: jest.fn(),
          },
        },
        {
          provide: getModelToken(Orders.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<FindAllOrderService>(FindAllOrderService);
    repository = module.get<FindAllOrderRepository>(FindAllOrderRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of orders', async () => {
      const page = 1;
      const limit = 10;
      const status = OrderStatusEnum.InPreparation;

      const mockOrders: OrderEntity[] = [
        new OrderEntity(['item1'], OrderStatusEnum.InPreparation),
        new OrderEntity(['item2'], OrderStatusEnum.InPreparation),
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(mockOrders);

      const result = await service.findAll(page, limit, status);
      expect(result).toEqual(mockOrders);
      expect(repository.findAll).toHaveBeenCalledWith(page, limit, status);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });
});
