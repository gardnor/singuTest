import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { OrderModule } from '../../order.module';
import { UpdateOrderStatusDto } from '../../application/dto/updateOrderStatus.dto';
import { OrderStatusEnum } from '../../domain/enums/orderStatus.enum';

describe('UpdateOrderController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [OrderModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should update an order and return the updated order', async () => {
    const orderId = '66c17b6daf11e62050e131aa'; 
    const updateOrderDto: UpdateOrderStatusDto = { status: OrderStatusEnum.Ready };

    const response = await request(app.getHttpServer())
      .patch(`/orders/${orderId}/status`)
      .send(updateOrderDto)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('_id', orderId);
    expect(response.body.status).toEqual(updateOrderDto.status);
  });
});
