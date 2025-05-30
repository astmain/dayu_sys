import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class IpBlackListAddDto {

  @ApiProperty({
    description: 'ip黑名单',
    type:String,
  })
  @IsNotEmpty({ message: 'ip' })
  ip: string;

  @ApiProperty({
    description: '排序',
    type:Number,
  })
  @Transform(({ value }) => {
        if(!value){
            return 0;
        }
        return value;
    })
    sort: number

}
