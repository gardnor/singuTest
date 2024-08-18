import { Test, TestingModule } from '@nestjs/testing';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { UpdateOrderStatusController } from '../../application/controllers/updateOrderStatus.controller';
import { UpdateOrderStatusService } from '../../application/services/updateOrderStatus.service';

describe('UpdateOrderController', () => {
  let controller: UpdateOrderStatusController;
  let service: UpdateOrderStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateOrderStatusController],
      providers: [
        {
          provide: UpdateOrderStatusService,
          useValue: {
            updateStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UpdateOrderStatusController>(
      UpdateOrderStatusController,
    );
    service = module.get<UpdateOrderStatusService>(UpdateOrderStatusService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('updateOrder', () => {
    it('should update an order status and return it', async () => {
      const id = '66c18030b4eb9b49443b9db4';
      const status: OrderStatusEnum = OrderStatusEnum.InPreparation;

      const updatedOrder = {
        status,
        __v: 0,
      };

      (service.updateStatus as jest.Mock).mockResolvedValue(updatedOrder);

      const result = await controller.updateStatus(id, { status });
      expect(result).toEqual(updatedOrder);
      expect(service.updateStatus).toHaveBeenCalledWith(id, status);
      expect(service.updateStatus).toHaveBeenCalledTimes(1);
    });
  });
});
