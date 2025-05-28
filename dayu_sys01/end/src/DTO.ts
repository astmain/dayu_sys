import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @ApiProperty({ description: '猫的名字' })
  name: string;

  @ApiProperty({ description: '猫的年龄', example: 3 })
  age: number;
}
