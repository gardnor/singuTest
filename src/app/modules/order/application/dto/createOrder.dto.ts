import { IsNotEmpty, IsArray, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: 'List of items included in the order',
    type: [String],
    example: ['pizza', 'coca lata'],
  })
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly items: string[];
}
