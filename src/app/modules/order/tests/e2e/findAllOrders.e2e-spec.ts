import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { FindAllOrderService } from '../../application/services/findAllOrder.service';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';
import { OrderModule } from '../../order.module';



describe('FindAllOrderController (e2e)', () => {
  let app: INestApplication;
  let service: FindAllOrderService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<FindAllOrderService>(FindAllOrderService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a list of orders with default pagination', async () => {
    const mockOrders = [{ id: '1', items: ['item1'], status: OrderStatusEnum.InPreparation }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

    const response = await request(app.getHttpServer())
      .get('/orders')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual(mockOrders);
  });

  it('should return a list of orders with pagination', async () => {
    const mockOrders = [{ id: '1', items: ['item1'], status: OrderStatusEnum.Delivered }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

    const response = await request(app.getHttpServer())
      .get('/orders')
      .query({ page: 2, limit: 5 })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual(mockOrders);
  });

  it('should return a filtered list of orders by status', async () => {
    const mockOrders = [{ id: '2', items: ['item2'], status: OrderStatusEnum.InPreparation }];
    jest.spyOn(service, 'findAll').mockResolvedValue(mockOrders);

    const response = await request(app.getHttpServer())
      .get('/orders')
      .query({ status: OrderStatusEnum.InPreparation })
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toEqual(mockOrders);
  });
});
