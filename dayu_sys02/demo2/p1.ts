
import { IsInt } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
class AAA {
    @ApiProperty({ description: 'id', example: 1 })
    @IsInt({ message: "id:必须是正整数" })
    id: number;
}


class BBB extends AAA {
    @ApiProperty({ description: 'id', example: 1, required: false })
    @IsInt({ message: "id:必须是正整数" })
    declare id: number;
}


// BBB继承AAA的id 让BBBid是可选参数 应该怎么修改代码