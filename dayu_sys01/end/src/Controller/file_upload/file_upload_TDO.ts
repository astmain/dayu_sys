import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";


class update {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

    @ApiProperty({description: '用户名', default: '', type: String})
    @IsOptional()
    @IsString()
    name: string = "";
}

class del {
    @ApiProperty({description: 'id', default: 0, type: Number})
    @IsOptional()
    @IsNumber()
    id: number = 0;

}


class img_url_DTO {
    @ApiProperty({type: String, description: '图片url', default: "https://gitee.com/astmain/static/raw/master/pay/unpaid_qr_code.jpg",  required: true,})
    @IsNotEmpty()
    @IsString()
    img_url: string;
}

export {
    update,
    del,
    img_url_DTO
}







