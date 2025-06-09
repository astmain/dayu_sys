import {createZodDto} from 'nestjs-zod'
import {z} from 'zod'

export const CountrySchema = z
    .object({
        name: z.string({
            required_error: 'Name is required',
            invalid_type_error: 'Name is invalid',

        }).describe("用户名称"),

    })
    .required();


export const create_user2 = createZodDto(CountrySchema);
