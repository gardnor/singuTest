import { Test, TestingModule } from '@nestjs/testing';
import { CreateOrderController } from '../../application/controllers/createOrder.controller';
import { CreateOrderService } from '../../application/services/createOrder.service';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { CreateOrderDto } from '../../application/dto/createOrder.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CreateOrderController', () => {
  let controller: CreateOrderController;
  let service: CreateOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateOrderController],
      providers: [
        {
          provide: CreateOrderService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CreateOrderController>(CreateOrderController);
    service = module.get<CreateOrderService>(CreateOrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order and return it', async () => {
      const createOrderDto: CreateOrderDto = {
        items: ['item1', 'item2'],
      };

      const createdOrder = {
        ...createOrderDto,
        __v: 0,
      };

      (service.create as jest.Mock).mockResolvedValue(createdOrder);

      const result = await controller.createOrder(createOrderDto);

      expect(result).toEqual(createdOrder);
      expect(service.create).toHaveBeenCalledWith(createOrderDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an HttpException if an invalid input is provided', async () => {
      const createOrderDto: any = {
        items: ['item1', 'item2'],
        status: 'InvalidInputStatus',
      };

      (service.create as jest.Mock).mockImplementation(() => {
        throw new HttpException(
          'Invalid input provided',
          HttpStatus.BAD_REQUEST,
        );
      });

      await expect(controller.createOrder(createOrderDto)).rejects.toThrow(
        new HttpException('Invalid input provided', HttpStatus.BAD_REQUEST),
      );

      expect(service.create).toHaveBeenCalledWith(createOrderDto);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });
});
