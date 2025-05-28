import {ArgumentMetadata, Injectable, PipeTransform} from "@nestjs/common"


@Injectable()
export class DTO_test_pipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("DTO_test_pipe---",{value, metadata})
        return value
    }
}