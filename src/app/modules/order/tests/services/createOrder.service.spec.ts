import { Test, TestingModule } from '@nestjs/testing';
import { UpdateOrderStatusService } from '../../application/services/updateOrderStatus.service';
import { UpdateOrderStatusRepository } from '../../infrastructure/repositories/updateOrderStatus.repository';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { IOrder } from '../../domain/interfaces/order.interface';

describe('UpdateOrderStatusService', () => {
  let service: UpdateOrderStatusService;
  let repository: UpdateOrderStatusRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateOrderStatusService,
        {
          provide: UpdateOrderStatusRepository,
          useValue: {
            updateStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UpdateOrderStatusService>(UpdateOrderStatusService);
    repository = module.get<UpdateOrderStatusRepository>(
      UpdateOrderStatusRepository,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateStatus', () => {
    it('should update the order status and return the updated order', async () => {
      const id = '66c18030b4eb9b49443b9db4';
      const status: OrderStatusEnum = OrderStatusEnum.InPreparation;

      const updatedOrder: IOrder = {
        _id: id,
        status,
        items: ['item1', 'item2'],
      };

      (repository.updateStatus as jest.Mock).mockResolvedValue(updatedOrder);

      const result = await service.updateStatus(id, status);
      expect(result).toEqual(updatedOrder);
      expect(repository.updateStatus).toHaveBeenCalledWith(id, status);
      expect(repository.updateStatus).toHaveBeenCalledTimes(1);
    });
  });
});
