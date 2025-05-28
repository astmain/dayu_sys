import {SetMetadata} from '@nestjs/common';
// @ts-ignore

declare global {
    var myGlobalConfig: {
        appName: string;
        debugMode: boolean;
    };
}




export const IS_PUBLIC_KEY = 'isPublic';
const Dec_public = () => SetMetadata(IS_PUBLIC_KEY, true);








export  function config_globalThis() {
    globalThis.aaa="aaa";
    globalThis.ccc="ccc";
    globalThis.Dec_public=Dec_public;
}