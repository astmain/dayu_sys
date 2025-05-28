// logger.module.ts
import {Global, Module} from '@nestjs/common';

import {build_tree} from './build_tree';
import {build_tree_arr_flat} from './build_tree_arr_flat';
import {build_tree_depart_role} from './build_tree_depart_role';
import {build_tree_ids} from './build_tree_ids';
import {crypt_encode_md5} from './crypt_encode_md5';
import {Dec_public} from './Dec_public';
import {Get_form} from './Get_form';
import {R} from './R';
import {price_1_make} from "./price_1_make";

export const tools = {
    build_tree,
    build_tree_arr_flat,
    build_tree_depart_role,
    build_tree_ids,
    crypt_encode_md5,
    Dec_public,
    Get_form,
    R,
    price_1_make,
}


@Global()
@Module({

    providers: [{
        provide: 'tools',
        useValue: tools,
    }],
    exports: [
        {
            provide: 'tools',
            useValue: tools,
        }
    ],

})
export class tools_Module {
}
